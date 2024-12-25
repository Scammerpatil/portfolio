"use client";
import "./../index.css";
import "@mantine/core/styles.css";
import { Toaster } from "react-hot-toast";
import { ColorProvider } from "@/context/colorContext";
import SideNav from "@/components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="night" suppressHydrationWarning>
      <head>
        <title>
          Saurav Patil | Crafting Full-Stack Experiences with MERN & Beyond
        </title>
        <meta
          name="description"
          content="I'm Saurav Patil, a passionate full-stack developer specializing in the MERN stack, with expertise in Next.js, .NET, and modern web technologies. I love building dynamic, scalable web applications that push the boundaries of innovation. From frontend finesse to backend efficiency, I craft seamless digital experiences, always eager to learn and integrate the latest tech trends into my work"
        />
      </head>
      <body className={`antialiased bg-base-100`}>
        <ColorProvider>
          <Toaster />
          <SideNav>{children}</SideNav>
        </ColorProvider>
      </body>
    </html>
  );
}
