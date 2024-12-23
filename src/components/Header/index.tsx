import { IconHexagonLetterS } from "@tabler/icons-react";
import SideBar from "./Sidebar";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import { useEffect, useState } from "react";
import ThemeController from "./ThemeController";
import toast from "react-hot-toast";

const links = [
  "About",
  "Projects",
  "Skills",
  "Blog",
  "Services",
  "Experience",
  "Contact",
];
const navLinks = (col: Boolean, clicked: any) => {
  const handleClick = () => {
    if (clicked) clicked();
  };
  return links.map((link, index) => {
    return (
      <a
        key={index}
        onClick={handleClick}
        className={`${
          col ? "flex flex-col items-center" : ""
        } text-base-content text-lg font-mono hover:text-primary`}
        href={`#${link}`}
      >
        {link}
      </a>
    );
  });
};

const Header = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(476)})`);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shadow, setShadow] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 70) setShow(false);
    else setShow(true);
    if (window.scrollY > 70) setShadow(true);
    else setShadow(false);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  });

  return (
    <div
      className={`navbar ${show ? "translate-y-0" : "-translate-y-28"} ${
        shadow ? "shadow-lg shadow-primary/50" : ""
      } 
      transition-transform absolute duration-500 ease-in-out w-full z-50 bg-transparent h-32 px-10 xs-mx:px-4 xs-mx:h-20 `}
    >
      <div className="navbar-start">
        <div className="flex flex-col items-center text-base-content text-base lg:text-2xl font-mono">
          <IconHexagonLetterS
            className="z-10 text-primary"
            size={isMobile ? 45 : 60}
            stroke={1.25}
          />
          <hr className="w-full border-base-content my-1" />
          Scammer Patil
        </div>
      </div>
      <div className="hidden bs:flex bs:navbar-center gap-8">
        {navLinks(false, null)}
      </div>
      <div className="navbar-end">
        <button
          className="hidden lg:block btn btn-primary cursor-pointer opacity-0"
          onClick={() => {
            toast.success("Sign In");
          }}
        >
          Sign In
        </button>
        <ThemeController />
      </div>
      <SideBar />
    </div>
  );
};
export default Header;
export { navLinks };
