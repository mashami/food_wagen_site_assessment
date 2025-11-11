import type { Metadata } from "next";
import localFont from "next/font/local";
import "/src/styles/globals.scss";
import { Source_Sans_3 } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { AppContextProvider } from "@/context/AppContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Food wagen",
  description: "Food wagen"
};

const source_Sans_3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-Source-Sans-pro"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`${source_Sans_3.variable} font-source_san antialiased`)}
      >
        <div>
          <AppContextProvider>{children}</AppContextProvider>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
