"use client";
import "../globals.css";
import axios from "axios";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import ProgressBar from "@/components/ProgressBar";
import { ColorProvider } from "@/context/colorContext";
import { CacheProvider, useCache } from "@/context/cacheContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Component = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { cache, setCache } = useCache();
  const fetchUser = async () => {
    setLoading(true);
    if (cache) {
      console.log("Using cached user data");
      setLoading(false);
      return;
    }
    try {
      const userData = await axios.get("/api/user");
      setCache(userData.data);
    } catch (error) {
      fetchUser();
    }
    setLoading(false);
  };
  const fetchUniqueID = async () => {
    if (sessionStorage.getItem("hasVisited")) return;
    try {
      sessionStorage.setItem("hasVisited", "true");
      await axios.get("/api/track-visitor");
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
    fetchUniqueID();
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3987691793365063"
          crossOrigin="anonymous"
        ></script>
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
        <SpeedInsights />
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loader />
          </div>
        ) : (
          <ColorProvider>
            <ProgressBar />
            <Toaster />
            {children}
            <Footer visitorCount={cache?.visitorCount || 0} />
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
