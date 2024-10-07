import Appbar from "./components/Appbar";
import { AuroraBackground } from "@/app/components/ui/aurora-background";
import { HeroTitle } from "./components/HeroTitle";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);

  if (session) {
    redirect("/home");
  }

  return (
    <div>
      <AuroraBackground>
        <div className="z-10">
          <Appbar />
          <HeroTitle />
        </div>
      </AuroraBackground>
    </div>
  );
}
