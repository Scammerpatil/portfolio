"use client";
import { useEffect, useState } from "react";
import About from "@/components/About";
import { Loader } from "@/components/Loader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Social from "@/components/Social/indes";
import Mail from "@/components/Mail";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import axios from "axios";
import { User } from "@/types/User";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    languages: [],
    testimonials: [],
  });
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userData = await axios.get("/api/getUser");
      console.log(userData.data);
      setUser(userData.data);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <div
      className={` focus-visible:[&_button]:!outline-none min-h-[100dvh] ${
        loading ? "flex" : ""
      } items-center overflow-hidden justify-center`}
    >
      {loading !== true ? (
        <>
          <Header />
          <About />
          <Projects />
          <Skills language={user.languages} />
          <Experience />
          <Testimonials testimonial={user.testimonials} />
          <Contact />
          <Mail />
          <Social />
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default HomePage;
