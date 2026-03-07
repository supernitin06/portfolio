import type { Metadata } from "next";
import "./globals.css";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Nitin Chauhan | Full Stack MERN Developer",
  description:
    "Portfolio of Nitin Chauhan - Full Stack MERN Developer with experience in React, Node.js, MongoDB, and AWS. Building scalable web applications.",
  keywords: [
    "Nitin Chauhan",
    "Full Stack Developer",
    "MERN",
    "React",
    "Node.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Nitin Chauhan | Full Stack MERN Developer",
    description: "Portfolio showcasing projects and experience in full-stack development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen overflow-x-hidden">
        <AnimatedCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
