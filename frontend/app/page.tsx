import Appbar from "./components/Appbar";
import { HeroTitle } from "./components/HeroTitle";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./lib/auth";
import { redirect } from "next/navigation";
import { FeatureCard } from "./components/FeatureCard";
import "./component.css";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);

  if (session) {
    redirect("/home");
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Appbar should be fixed at the top */}
      <Appbar />

      {/* Scrollable content */}
      <div className="h-full overflow-y-scroll scrollbar-hide">
        {/* HeroTitle section (first screen height) */}
        <section className="h-screen flex justify-center items-center">
          <HeroTitle />
        </section>

        {/* Features section (second screen height) */}
        <section className="min-h-screen flex flex-col items-center justify-center">
          <div className="sm:text-xl md:text-3xl lg:text-5xl font-bold text-white text-center mt-20">
            Features that will help you <span className="text-yellow-500">GROW</span>
          </div>
          <FeatureCard />
        </section>



        <footer className="rounded-lg shadow-sm m-4 bg-neutral-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm sm:text-center text-gray-400">
              &copy; {new Date().getFullYear()} Kuber AI. All rights reserved.
            </span>
          </div>
        </footer>

      </div>

    </div>
  );
}
