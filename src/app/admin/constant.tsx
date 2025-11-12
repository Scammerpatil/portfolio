import { SideNavItem } from "@/types/Types";
import {
  IconUserShield,
  IconUsers,
  IconChecklist,
  IconUser,
  IconCode,
  IconBriefcase,
  IconBook,
  IconWorld,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <IconUserShield width="24" height="24" />,
  },
  {
    title: "About Me",
    path: "/admin/about-me",
    icon: <IconUser width="24" height="24" />,
  },
  {
    title: "Languages & Skills",
    path: "/admin/languages-skills",
    icon: <IconCode width="24" height="24" />,
  },
  {
    title: "Projects",
    path: "/admin/projects",
    icon: <IconBriefcase width="24" height="24" />,
  },
  {
    title: "Experience",
    path: "/admin/experience",
    icon: <IconUsers size={24} />,
  },
  {
    title: "Tickets",
    path: "/admin/tickets",
    icon: <IconChecklist size={24} />,
  },
  {
    title: "Service Requests",
    path: "/admin/service-requests",
    icon: <IconWorld size={24} />,
  },
  {
    title: "Testimonials",
    path: "/admin/testimonials",
    icon: <IconUsers size={24} />,
  },
  {
    title: "Blogs",
    path: "/admin/blogs",
    icon: <IconBook size={24} />,
  },
];
