import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Bagel_Fat_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const displayFont = Bagel_Fat_One({
  variable: "--font-bagel",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Zololo Games", template: "%s · Zololo Games" },
  description:
    "Short games for counting, sums, phonics, shapes, patterns and memory, for children aged 4 to 8 and up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="relative flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <Navbar />
        <MotionProvider>{children}</MotionProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
