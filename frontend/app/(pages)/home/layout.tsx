"use client";
import React, { useState, useEffect, Suspense } from "react";
import { signOut, useSession } from "next-auth/react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn, fetchInitials } from "@/app/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import { useSetRecoilState } from "recoil";
import { fetchData } from "@/app/api/utility/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/app/components/Loader";
import links from "@/app/util/links";

function MessageWarning() {
  const searchedMessage = useSearchParams();
  const message = searchedMessage.get("message");

  useEffect(() => {
    if (message) {
      toast.warn(message, {
        autoClose: 2000,
      });
    }
  }, [message]);

  return null;
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const setUserFinancialInfo = useSetRecoilState(userFinancialInfoState);
  const { data: session, status } = useSession();

  const user_id = session?.user?.user_id;
  const initials = fetchInitials(session);

  useEffect(() => {
    if (status !== "authenticated" || !user_id) return;

    const fetchUserInfo = async () => {
      try {
        const response = await fetchData(`/userInfo/${user_id}`);
        if (response.status === 404) {
          if (response.errorType === "USER_NOT_FOUND") {
            await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin?message=User Not Registered` });
            return;
          }

          if (response.errorType === "FINANCIAL_RESULT_NOT_FOUND") {
            if (response.first_timer) {
              router.push("/form");
              return;
            } else {
              router.push("/form?message=Form incomplete.");
              return;
            }
          }
        }

        if (response.status === 200) {
          setUserFinancialInfo(response.userFinancialInfo);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, [status, user_id, router, setUserFinancialInfo]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Handle loading and error states after hooks have been called
  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={false}
          theme="dark"
        />
        <MessageWarning />

        <div
          className={cn(
            "flex flex-col md:flex-row bg-neutral-800 w-full flex-1 max-w-8xl mx-auto border border-neutral-700 overflow-hidden",
            "h-screen"
          )}
        >
          <Sidebar open={open} setOpen={setOpen} animate={true}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Logo />
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
                {session?.user.image ? (
                  <SidebarLink
                    link={{
                      label: session.user.name!,
                      href: "#",
                      icon: (
                        <Image
                          src={session?.user.image!}
                          className="h-7 w-7 flex-shrink-0 rounded-full"
                          width={50}
                          height={50}
                          alt="Avatar"
                        />
                      ),
                    }}
                  />
                ) : (
                  <div>
                    <div
                      className="h-7 w-7 flex items-center justify-center bg-gray-500 text-white text-sm font-semibold rounded-full"
                      style={{ width: 30, height: 30 }}
                    >
                      {initials}
                    </div>
                    {session?.user.name}
                  </div>
                )}
              </div>
            </SidebarBody>
          </Sidebar>
          {children}
        </div>
      </Suspense>
    </>
  );
}

export const Logo = () => (
  <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-white whitespace-pre">
      Logo Here
    </motion.span>
  </Link>
);
