import Appbar from "./components/Appbar";
import { AuroraBackground } from "@/app/components/ui/aurora-background";
import { HeroTitle } from "./components/HeroTitle";

export default function Home() {
  return (
    <AuroraBackground>
      <div className="z-10">
        <Appbar />
        <HeroTitle/>
      </div>
    </AuroraBackground>
  );
}
