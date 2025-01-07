import Appbar from "./components/Appbar";
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
      <div className="">
          <Appbar />
          <HeroTitle />
        </div>
    </div>
  );
}