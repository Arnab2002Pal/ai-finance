// "use client";
// import React, { useEffect, useState } from "react";
// import Appbar from "../../components/Appbar";
// import Doughnut from "@/app/components/ui/doughnut";
// import { useSession } from "next-auth/react";
// import { getUserInfo } from "@/app/api/utility/api";
// import { UserData } from "@/interface/userInterface";
// import { useRouter } from "next/navigation";

// const Home: React.FC = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [userData, setUserData] = useState<UserData>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const user_id = session?.user?.user_id;

//   // Fetch user data
//   const fetchData = async (id: number) => {
//     try {
//       const data = await getUserInfo(`userInfo/${id}`);
//       setUserData(data);
//     } catch (err) {
//       console.error("Error fetching user info:", err);
//       setError("Failed to fetch user data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data when the user is available
//   useEffect(() => {
//     if (user_id) {
//       fetchData(user_id);
//     }
//   }, [user_id]);


//   // By using useEffect, the component can render initially, and then if the status is unauthenticated, it triggers the redirection. This prevents a blocking operation that could slow down or even prevent the page from loading.
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   // Destructure user financial info for easier access
//   const {
//     userFinancialInfo: {
//       expenseAnalysis = {},
//       debtManagement = {},
//       investmentAdvice = {},
//       goalRoadmap = {},
//       growth = {},
//       savingPlan = {},
//       structuredPlan = {},
//       summary = "",
//     } = {},
//   } = userData;

//   return (
//     <div>
//       <Appbar />
//       <div className="mx-4 my-6 border-2 border-normal-500 border-solid rounded-xl h-screen">
//         <div className="flex justify-center items-center">
//           {loading ? (
//             <p>Generating the report...</p>
//           ) : loading && error ? (
//             <p className="text-red-500">{error}</p>
//           ) : (
//             <Doughnut expense={expenseAnalysis} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;






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
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: session, status } = useSession();

  const name = session?.user.name?.split(" ") || [];
  const firstNameInitial = name.length > 0 ? name[0][0] : "";
  const lastNameInitial = name.length > 1 ? name[1][0] : "";
  const initials = `${firstNameInitial}${lastNameInitial}`

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
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () =>
        console.log("Cloented")
    },
  ];
  const [open, setOpen] = useState(false);
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
                    <img
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
      <Dashboard />
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
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={"first" + i}
              className="h-20 w-full rounded-lg  bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second" + i}
              className="h-full w-full rounded-lg bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};