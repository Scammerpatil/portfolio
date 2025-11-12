"use client";
import { ColorProvider } from "@/context/colorContext";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { CacheProvider, useCache } from "@/context/cacheContext";
import SideNav from "./SideNav";
import { Loader } from "@/components/Loader";

const Component = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { setCache } = useCache();
  const fetchUser = async () => {
    setLoading(true);
    const userData = await axios.get("/api/user");
    setCache(userData.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <html lang="en">
      <head>
        <title>
          Saurav Patil | Top Full-Stack Developer & Freelancer | MERN, Next.js,
          .NET
        </title>
        <meta
          name="description"
          content="Saurav Patil is a top-rated full-stack developer and freelancer, specializing in the MERN stack, Next.js, and .NET. He builds high-performance, scalable web apps with modern web technologies."
        />
        <meta
          name="keywords"
          content="Saurav Patil, full-stack developer, MERN developer, Next.js expert, .NET developer, top freelancer, best developer, web developer portfolio, JavaScript developer, React developer, Node.js developer, remote developer, hire web developer"
        />
        <meta name="author" content="Saurav Patil" />
        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Saurav Patil | Full-Stack Developer & Freelancer"
        />
        <meta
          property="og:description"
          content="Explore the portfolio of Saurav Patil — a skilled full-stack developer with expertise in MERN, Next.js, and .NET technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scammerpatil.vercel.app/" />
        <meta
          property="og:image"
          content="https://scammerpatil.vercel.app/profile.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Saurav Patil | Full-Stack Developer & Freelancer"
        />
        <meta
          name="twitter:description"
          content="Passionate full-stack developer with a focus on MERN, Next.js & .NET technologies."
        />
        <meta
          name="twitter:image"
          content="https://scammerpatil.vercel.app//twitter-image.jpg"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`antialiased roboto-condensed`}>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loader />
          </div>
        ) : (
          <ColorProvider>
            <Toaster />
            <SideNav>{children}</SideNav>
          </ColorProvider>
        )}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CacheProvider>
      <Component>{children}</Component>
    </CacheProvider>
  );
}
