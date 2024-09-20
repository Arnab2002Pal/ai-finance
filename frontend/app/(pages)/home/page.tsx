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
import { cn } from "@/app/lib/utils";
import { getUserInfo } from "@/app/api/utility/api";
import { useRouter } from "next/navigation";
import { UserData } from "@/interface/userInterface";
import { Dashboard } from "@/app/components/Dashboard";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const { data: session, status } = useSession();
  const user_id = session?.user?.user_id;


  const name = session?.user.name?.split(" ") || [];
  const firstNameInitial = name.length > 0 ? name[0][0] : "";
  const lastNameInitial = name.length > 1 ? name[1][0] : "";
  const initials = `${firstNameInitial}${lastNameInitial}`

  // Fetch user data
 const fetchData = async (id: number) => {

  try {
    const data = await getUserInfo(`userInfo/${id}`);
    if (data.success === false) {
      router.push('/form?message=Incomplete Profile');
      return;
    }

    setUserData(data);
  } catch (err) {
    console.error("Error fetching user info:", err);
    setError("Failed to fetch user data.");
  } finally {
    setLoading(false);
  }
};


  // Fetch data when the user is available
  useEffect(() => {
    if (user_id) {      
      fetchData(user_id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);


  // By using useEffect, the component can render initially, and then if the status is unauthenticated, it triggers the redirection. This prevents a blocking operation that could slow down or even prevent the page from loading.
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Verifying...</p>;
  }

  // Destructure user financial info for easier access
  const {
    userFinancialInfo: {
      expenseAnalysis = {},
      debtManagement = {},
      investmentAdvice = {},
      goalRoadmap = {},
      growth = {},
      savingPlan = {},
      structuredPlan = {},
      summary = "",
    } = {},
  } = userData;

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
      icon: (
        <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "logout",
      icon: (
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  return (
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
      <Dashboard
        expense={userData.userFinancialInfo?.expenseAnalysis}
        debt={userData.userFinancialInfo?.debtManagement}
        investment={userData.userFinancialInfo?.investmentAdvice}
      />
    </div>
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

// Dummy dashboard component with content
