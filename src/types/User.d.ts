import { Experience } from "./Experience";
import { Language } from "./Language";
import { ProjectData } from "./Project";
import { Testimonial } from "./Testimonial";

export interface SocialLink {
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export interface User {
  name: string;
  stack: string[];
  bio: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
  languages: Language[];
  testimonials: Testimonial[];
  projects: ProjectData[];
  experience: Experience[];
  visitorCount: number;
}
