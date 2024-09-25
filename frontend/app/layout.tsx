import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from 'recoil';
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fortuna AI",
  description: "Intelligent financial management app that empowers users to make smarter investment decisions with the help of advanced AI-driven insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <Providers>
            {children}
          </Providers>
        </RecoilRoot>
      </body>
    </html>
  );
}
