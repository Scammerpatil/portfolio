"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ExperienceModel from "@/components/Experience";
import Loading from "@/components/Loading";
import Mail from "@/components/Mail";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Social from "@/components/Social";
import Testimonials from "@/components/Testimonials";
import { useCache } from "@/context/cacheContext";

export default function Home() {
  const { cache: user } = useCache();
  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <>
          <Navbar className="fixed top-0 left-0" />
          <About bio={user.bio} name={user.name} stack={user.stack} />
          <Projects projects={user.projects} />
          <Skills language={user.languages} />
          <ExperienceModel experience={user.experience} />
          <Testimonials testimonial={user.testimonials} />
          <Mail mail={user.email} />
          <Contact />
          <Social />
        </>
      )}
    </>
  );
}
