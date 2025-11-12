"use client";

import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { IconBrandGithub, IconDownload } from "@tabler/icons-react";
import Particles from "./Particles";
import { NeonGradientCard } from "./neon-gradient-card";
import Image from "next/image";
import { useColorContext } from "@/context/colorContext";

const About = ({
  name,
  bio,
  stack,
}: {
  name: string;
  bio: string;
  stack: string[];
}) => {
  const { color } = useColorContext();
  return (
    <section
      id="about"
      className="relative flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around gap-10 lg:gap-16 overflow-hidden bg-base-300/10 px-6 md:px-14 py-20 md:py-28 lg:py-36 min-h-screen"
    >
      <Particles
        className="absolute inset-0 -z-20 min-h-screen text-primary"
        quantity={1500}
        ease={80}
        vx={0.1}
        vy={0.1}
        color={color}
        refresh
      />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full lg:w-3/5 flex flex-col items-center lg:items-start gap-3 md:gap-5"
      >
        <p className="text-lg md:text-2xl lg:text-3xl font-medium text-base-content/80">
          Hi, I am
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-[4.25rem] font-extrabold leading-tight bg-clip-text text-transparent bg-linear-to-r from-primary via-accent to-secondary">
          {name}
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-base-content flex flex-wrap justify-center lg:justify-start">
          I&apos;m a&nbsp;
          <span className="text-primary">
            <Typewriter
              options={{ strings: stack, autoStart: true, loop: true }}
            />
          </span>
        </h2>

        <p className="text-sm md:text-base lg:text-lg text-justify text-base-content/80 font-medium max-w-2xl">
          {bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="https://github.com/scammerpatil"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-md lg:btn-lg flex items-center gap-2"
          >
            Check My GitHub <IconBrandGithub size={22} />
          </a>

          <a
            href="/Saurav_Deepak_Patil_Computer_Engineer.pdf"
            download="Saurav_Deepak_Patil_Computer_Engineer.pdf"
            className="btn btn-primary btn-md lg:btn-lg flex items-center gap-2 "
          >
            Download My Resume <IconDownload size={20} />
          </a>
        </div>
      </motion.div>

      {/* ===== Right: Profile Image ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex justify-center items-center"
      >
        <NeonGradientCard className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-[325px] lg:h-[325px] rounded-full">
          <Image
            src="/images/profile.jpg"
            alt="profile"
            width={325}
            height={325}
            className="rounded-full w-full h-full object-cover"
          />
        </NeonGradientCard>
      </motion.div>
    </section>
  );
};

export default About;
