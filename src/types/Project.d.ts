export interface ProjectData {
  _id?: string;
  name: string;
  title: string;
  slug: string;
  desc: string;
  industry: string;
  challenge: string;
  solution: string;
  bannerImage: {
    data: Buffer;
    contentType: string;
  };
  images: {
    data: Buffer;
    contentType: string;
  }[];
  liveLink: string;
  technologies: {
    stack: string;
    technologies: string[];
  }[];
  features: string[];
  github: string;
  envVariables?: string[];
  testimonial?: {
    clientFeedback: string;
    clientName: string;
  };
  stack?: string;
  comments?: {
    user: string;
    comment: string;
    date: Date;
  }[];
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  date?: Date;
}
