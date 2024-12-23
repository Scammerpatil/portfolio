import { Info } from "../User";
import Typewriter from "typewriter-effect";
import { IconDownload } from "@tabler/icons-react";
import Particles from "./Particles";
import { NeonGradientCard } from "./neon-gradient-card";
import { useEffect, useState } from "react";
import Color from "colorjs.io";
import Image from "next/image";

const About = () => {
  const [color, setColor] = useState<string>();
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "baseTheme";
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, [theme]);

  function oklchToHex(oklchString: string) {
    const oklch = `oklch(${oklchString})`;
    const color = new Color(oklch)
      .toGamut({ space: "srgb" })
      .to("srgb")
      .toString({ format: "hex" });
    return color;
  }

  const root = document.documentElement;
  useEffect(() => {
    try {
      const primaryColor = getComputedStyle(root)
        .getPropertyValue("--p")
        .trim();
      const convertedColor = oklchToHex(primaryColor);
      setColor(convertedColor);
    } catch (error) {
      console.error("Error initializing About component:", error);
    }
  }, [theme, root]);

  return (
    <>
      <div
        data-aos="zoom-out-up"
        data-aos-duration="800"
        className="bg-base-300 flex flex-col lg:flex-row relative overflow-hidden justify-center lg:justify-around items-center font-mono px-6 md:px-10 py-10 md:py-16 lg:py-32 min-h-screen gap-6 sm-mx:flex-col-reverse aos-init aos-animate"
        id="About"
      >
        <Particles
          className="absolute top-5 -z-20 inset-0 min-h-screen text-primary"
          quantity={1500}
          ease={80}
          vx={0.1}
          vy={0.1}
          color={color}
          refresh
        />
        <div className="bs:ml-10 bs:w-3/5 flex flex-col h-full lg-mx:gap-3 bs-mx:items-center">
          <div className="text-primary text-3xl lg-mx:text-2xl xs-mx:text-xl xsm-mx:text-lg">
            Hi, I am
          </div>
          <div className="text-base-content text-[4.25rem] font-extrabold lg-mx:text-5xl sm-mx:text-4xl xs-mx:text-3xl xsm-mx:text-[27px]">
            {Info.name}
          </div>
          <div className="text-base-content text-4xl flex font-semibold lg-mx:text-[27px] sm-mx:text-2xl xs-mx:text-xl xsm-mx:text-base">
            I&apos;m a&nbsp;
            <span className="text-primary">
              <Typewriter
                options={{ strings: Info.stack, autoStart: true, loop: true }}
              />
            </span>
          </div>
          <div className="text-base-content text-xl text-justify my-8 lg-mx:my-0 font-semibold lg-mx:text-sm">
            {Info.bio}
          </div>
          <div className="xs-mx:w-[90%] flex gap-3 xs-mx:justify-between">
            <button className="btn btn-secondary text-secondary-content text-base lg:text-lg">
              Check Resume
            </button>
            <a
              href="Resume.pdf"
              download={Info.name}
              className="btn btn-primary text-primary-content text-base lg:text-lg"
            >
              Download <IconDownload size={20} />
            </a>
          </div>
        </div>
        <div className="h-fit flex justify-center items-center rounded-full bs:mr-10 w-fit">
          <NeonGradientCard className="w-[325px] h-[325px] lg-mx:w-64 lg-mx:h-64 xsm-mx:w-56 xsm-mx:h-56 items-center justify-center text-center">
            <Image
              className="w-full h-full rounded-full"
              src="/profile.jpg"
              height={325}
              width={325}
              alt="profile"
            />
          </NeonGradientCard>
        </div>
      </div>
    </>
  );
};

export default About;
