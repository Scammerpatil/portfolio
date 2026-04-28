import { IconHexagonLetterS, IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar({ className }: { className?: string }) {
  const links = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
    { name: "Blogs", href: "/blogs" },
    { name: "Services", href: "/services" },
  ];

  const [show, setShow] = useState(true);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    setShadow(window.scrollY > 70);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setShow(false);
      } else {
        setShow(true);
      }

      setShadow(currentScrollY > 70);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    scrolledUp: { y: "-100%", opacity: 1 },
  };

  return (
    <motion.div
      className={`navbar ${
        shadow ? "shadow-lg shadow-primary/50" : ""
      } fixed top-0 w-full z-50 bg-transparent lg:h-32 lg:px-24 px-4 py-4 md:py-0 min-h-20 orbitron ${className}`}
      variants={navVariants}
      initial="hidden"
      animate={show ? "visible" : "scrolledUp"} 
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="navbar-start flex-1">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-base-content text-base lg:text-2xl w-max"
          >
            <IconHexagonLetterS className="lg:hidden z-10 text-primary" size={45} stroke={1.25} />
            <IconHexagonLetterS className="hidden lg:block z-10 text-primary" size={60} stroke={1.25} />
            <hr className="w-full border-base-content my-1" />
            Scammer Patil
          </motion.div>
        </Link>
      </div>

      <div className="navbar-center hidden xl:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">
          {links.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link href={link.href} className="text-base-content text-lg hover:text-primary font-semibold">
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="navbar-end space-x-2 flex-1 justify-end">
        <Link href="/login" className="btn opacity-0">
          Login
        </Link>
        <ThemeToggler />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-outline btn-primary xl:hidden" aria-label="Menu">
            <IconMenu2 />
          </div>
          <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} onClick={() => {
                  const elem = document.activeElement as HTMLElement;
                  if (elem) elem.blur();
                }}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}