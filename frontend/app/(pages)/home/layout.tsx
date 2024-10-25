"use client";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
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
  const searchedMessage = useSearchParams();
  const message = searchedMessage.get("message");

  const user_id = session?.user?.user_id;
  const initials = fetchInitials(session);
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "logout",
      icon: (
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  useEffect(() => {
    if (status !== "authenticated" || !user_id) return; // Early return if conditions are not met

    const fetchUserInfo = async () => {
      try {
        const response = await fetchData(`/userInfo/${user_id}`);

        // Redirect based on error types for better readability
        if (response.status === 404) {
          if (response.errorType === "USER_NOT_FOUND") {
            await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin?message=User Not Registered` })
            return;
          }

          if (response.errorType === "FINANCIAL_RESULT_NOT_FOUND") {
            if (response.first_timer) {
              router.push("/form");
              return;
            } else {
              router.push("/form?message=Form is incomplete.");
              return;
            }
          }
        }

        // Successful response handling
        if (response.status === 200) {
          setUserFinancialInfo(response.userFinancialInfo);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, [status, user_id, router, message, setUserFinancialInfo]);

  // By using useEffect, the component renders initially, and then if the status is unauthenticated, it triggers the redirection.
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (message) {
      toast.warn(message, {
        autoClose: 2000,
      });
    }
  }, [message]);

  // Handle loading and error states after hooks have been called
  if (status === "loading" || loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>;
  }



  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        theme="dark"
      />
      <div
        className={cn(
          " flex flex-col md:flex-row bg-neutral-800 w-full flex-1 max-w-8xl mx-auto border border-neutral-700 overflow-hidden",
          "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <>
                <Logo />
              </>
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
                <div className="">
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
    </>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Logo Here
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

