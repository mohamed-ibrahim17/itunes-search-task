import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNav from "@/layout/SideNav";
import Topbar from "@/layout/Topbar";
import { SideNavProvider } from "@/layout/useSideNav";
import { ITunesSearchProvider } from "@/hooks/useITunesSearch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iTunes Search App",
  description:
    "A modern, responsive web app for discovering and exploring podcasts and episodes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SideNavProvider>
          <ITunesSearchProvider>
            <div className="flex flex-row items-start h-screen w-full">
              <SideNav />
              <div className="flex-1 h-screen overflow-hidden flex flex-col">
                <Topbar />
                {children}
              </div>
            </div>
          </ITunesSearchProvider>
        </SideNavProvider>
      </body>
    </html>
  );
}
