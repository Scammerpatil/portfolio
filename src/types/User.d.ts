import { Language } from "./Language";
import { ProjectData } from "./Project";
import { Testimonial } from "./testimonial";

export interface User {
  languages: Language[];
  testimonials: Testimonial[];
  projects: ProjectData[];
  visitorCount: number;
}
