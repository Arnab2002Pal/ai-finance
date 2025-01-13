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

        <footer className="h-1/3 w-full bg-neutral-900 text-white flex flex-col items-center justify-center">

          <div className=" h-full w-full flex items-center justify-center">
            <div className="w-4/5 h-full"></div>
            <div className="p-6 text-left w-full h-full flex justify-center items-center">
              <div className="h-full w-full">
                <h3 className="text-xl font-bold mb-4">About Us</h3>
                <p className="text-sm text-gray-400">
                  Kuber AI is your financial partner for smarter, AI-powered investment decisions. Join us in building a wealthier future!
                </p>
              </div>
              <div className="h-full w-5/6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                  <div className="flex flex-col justify-center md:justify-start text-sm text-gray-400">
                    <div>
                      <p>
                        <strong className="text-white">Mail:</strong>{" "}
                        <a href="mailto:someone@example.com" target="_blank" className="hover:text-yellow-500">
                          arnabpal2002@gmail.com
                        </a>
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong className="text-white">X (Twitter):</strong>{" "}
                        <a href="https://x.com/ArnabK_Pal02" target="_blank" className="hover:text-yellow-500">
                          ArnabK_Pal02
                        </a>
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong className="text-white">Linkedin:</strong>{" "}
                        <a href="https:www.linkedin.com/in/arnabpal02" target="_blank" className="hover:text-yellow-500">
                          arnabpal02
                        </a>
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong className="text-white">Github:</strong>{" "}
                        <a href="https://github.com/Arnab2002Pal" target="_blank" className="hover:text-yellow-500">
                          Arnab2002Pal
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="h-20 w-full">
            <div className="h-2 border-t border-gray-800  w-full flex justify-center items-center">
              <div className="text-center mt-14 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Kuber AI. All rights reserved.
              </div>
            </div>
          </div>

          {/* <div className="max-w-[85rem] w-full bg-white grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            About Us
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-sm text-gray-400">
                Kuber AI is your financial partner for smarter, AI-powered investment decisions. Join us in building a wealthier future!
              </p>
            </div>


            Social Media
            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="https://facebook.com" target="_blank" className="hover:text-yellow-500">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="https://twitter.com" target="_blank" className="hover:text-yellow-500">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
                <a href="https://linkedin.com" target="_blank" className="hover:text-yellow-500">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </a>
              </div>
            </div>
          </div> */}
          {/* Copyright Section */}
          

        </footer>

      </div>

    </div>
  );
}
