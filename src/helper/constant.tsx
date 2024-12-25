import {
  IconHome,
  IconUser,
  IconCode,
  IconSettings,
  IconBook,
  IconBriefcase,
  IconMessageCircle,
} from "@tabler/icons-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <IconHome size={24} />,
  },
  {
    title: "About Me",
    path: "/dashboard/about",
    icon: <IconUser size={24} />,
  },
  {
    title: "Languages & Skills",
    path: "/dashboard/languages",
    icon: <IconCode size={24} />,
  },
  {
    title: "Projects",
    path: "/dashboard/projects",
    icon: <IconBriefcase size={24} />,
  },
  {
    title: "Blogs",
    path: "/dashboard/blogs",
    icon: <IconBook size={24} />,
  },
  {
    title: "Contact",
    path: "/dashboard/contact",
    icon: <IconMessageCircle size={24} />,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <IconSettings size={24} />,
  },
];
