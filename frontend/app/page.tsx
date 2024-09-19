import Appbar from "./components/Appbar";
import { AuroraBackground } from "@/app/components/ui/aurora-background";
import { HeroTitle } from "./components/HeroTitle";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./lib/auth";
import { redirect } from "next/navigation";
import FeatureSection from "./components/feature-section";
import { InfiniteMovingCards } from "./components/ui/feature-card";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH)

  if (session) {
    redirect("/home");
  }

  const sampleItems = [
    {
      quote: "This product has changed my life! Absolutely fantastic service.",
      name: "John Doe",
      title: "CEO, Company A",
    },
    {
      quote: "Excellent quality and customer service. Highly recommend!",
      name: "Jane Smith",
      title: "CTO, Tech Innovators",
    },
    {
      quote: "A remarkable experience from start to finish.",
      name: "Sam Green",
      title: "Product Manager, Creative Co.",
    },
    {
      quote: "I was blown away by the attention to detail and professionalism.",
      name: "Anna Johnson",
      title: "Freelancer, Design Studio",
    },
    {
      quote: "A top-notch service with incredible results. Five stars!",
      name: "Mark Lee",
      title: "Director, Startup X",
    },
    {
      quote: "A top-notch service with incredible results. Five stars!",
      name: "Mark Lee",
      title: "Director, Startup X",
    },
  ];
  
  return (
    <div>
      <AuroraBackground>
        <div className="z-10">
          <Appbar />
          <HeroTitle/>
        </div>
      </AuroraBackground>
        <InfiniteMovingCards items={sampleItems}/>
    {/* <FeatureSection/> */}
    </div>
  );
}
