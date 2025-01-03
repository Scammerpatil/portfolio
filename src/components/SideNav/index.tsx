"use client";
import { SideNavItem } from "@/types/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import ThemeController from "@/components/Header/ThemeController";
import {
  IconAlignJustified,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";
import { SIDENAV_ITEMS } from "@/helper/constant";

const SideNav = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      toast.success("Logged out successfully");
    } catch (error: unknown) {
      toast.error(`Failed to logout, ${String(error)}`);
    } finally {
      router.push("/");
    }
  };

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <>
      <div className="drawer lg:drawer-open max-h-screen">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar justify-between bg-base-300 w-full px-4 lg:pl-10">
            {/* Breadcrumbs */}
            <div className="lg:flex items-center justify-end space-x-2 hidden">
              <span className="text-base font-semibold">Home</span>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm">
                    <IconChevronRight />
                  </span>
                  <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                    <span className="text-base capitalize hover:text-primary transition">
                      {segment.replace(/-/g, " ")}
                    </span>
                  </Link>
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Header */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <IconAlignJustified className="h-6 w-6" />
              </label>
              <h1 className="text-xl font-bold text-base-content">Gamanika</h1>
              <ThemeController />
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeController />
              <div className="dropdown dropdown-left">
                <div tabIndex={0} className="btn m-1 w-full">
                  <Image
                    src="/User.png"
                    alt="User LOGO"
                    width={28}
                    height={28}
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-12 h-12 bg-primary text-primary-content rounded-full text-xl font-bold flex items-center justify-center">
                      S
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-semibold">Saurav Patil</span>
                  </div>
                  <hr className="my-2 border-base-content" />
                  <div className="flex flex-col">
                    <button
                      onClick={() => router.push("/account")}
                      className="text-left px-4 py-2 text-base hover:bg-base-200 transition duration-200"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => router.push("/profile")}
                      className="text-left px-4 py-2 text-base hover:bg-base-200 transition duration-200"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-left px-4 py-2 text-base hover:bg-base-200 transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-72px)]">
            {children}
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            className="drawer-overlay"
            aria-label="close sidebar"
          ></label>
          <div className="menu bg-base-200 text-base-content w-80 min-h-full p-4">
            <Link
              href="/dashboard"
              className="flex h-16 w-full items-center justify-center border-b border-base-content md:justify-start md:px-6 space-x-3"
            >
              <Image src="/logo.png" alt="logo" width={28} height={28} />
              <span className="text-xl font-bold">Personal Portfolio</span>
            </Link>
            <div className="flex flex-col mt-10 space-y-2">
              {SIDENAV_ITEMS.map((item, idx) => (
                <MenuItem key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  const baseClasses =
    "flex items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-primary-content";
  const activeClasses = "bg-base-300";
  const inactiveClasses = "text-base-content";

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`${baseClasses} ${
              pathname.includes(item.path) ? activeClasses : inactiveClasses
            }`}
          >
            <div className="flex items-center space-x-4">
              {item.icon}
              <span className="text-lg font-medium">{item.title}</span>
            </div>
            <IconChevronDown
              className={`transition-transform ${
                subMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </>
      ) : (
        <Link
          href={item.path}
          className={`${baseClasses} ${
            item.path === pathname ? activeClasses : inactiveClasses
          }`}
        >
          {item.icon}
          <span className="text-lg font-medium">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
