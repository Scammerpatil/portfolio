import { Language } from "./Language";
import { Testimonial } from "./testimonial";

export interface User {
  languages: Language[];
  testimonials: Testimonial[];
}
