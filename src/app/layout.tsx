"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ColorProvider } from "@/context/colorContext";

const theme = createTheme({
  breakpoints: {
    xs: "320px",
    sm: "476px",
    md: "640px",
    bs: "768px",
    lg: "900px",
    xl: "1024",
    "2xl": "1280",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
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
          <MantineProvider theme={theme}>
            <Toaster />
            {children}
          </MantineProvider>
        </ColorProvider>
      </body>
    </html>
  );
}
