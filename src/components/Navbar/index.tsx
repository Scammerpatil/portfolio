import { IconHexagonLetterS, IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import { motion } from "framer-motion"; // 👈 Add this import

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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shadow, setShadow] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 70) setShow(false);
    else setShow(true);

    setShadow(window.scrollY > 70);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // 🎬 Animation variants for the navbar
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className={`navbar ${show ? "translate-y-0" : "-translate-y-28"} ${
        shadow ? "shadow-lg shadow-primary/50" : ""
      }
      transition-transform duration-500 ease-in-out w-full z-50 bg-transparent lg:h-32 lg:px-24 px-4 py-4 md:py-0 min-h-20 orbitron ${className}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-start">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-base-content text-base lg:text-2xl"
          >
            <IconHexagonLetterS
              className="lg:hidden z-10 text-primary"
              size={45}
              stroke={1.25}
            />
            <IconHexagonLetterS
              className="hidden lg:block z-10 text-primary"
              size={60}
              stroke={1.25}
            />
            <hr className="w-full border-base-content my-1" />
            Scammer Patil
          </motion.div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">
          {links.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className="text-base-content text-lg hover:text-primary font-semibold"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        <Link href="/login" className="btn opacity-0">
          Login
        </Link>
        <ThemeToggler />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline btn-primary lg:hidden"
          >
            <IconMenu2 />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
