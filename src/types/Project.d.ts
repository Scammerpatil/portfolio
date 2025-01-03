export interface ProjectData {
  _id?: string;
  title: string;
  desc: string;
  image: string | File;
  live: boolean;
  technologies: string[];
  link?: string;
  github: string;
  stack?: string;
}
