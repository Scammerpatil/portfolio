export type Testimonial = {
  _id?: string;
  name: string;
  email: string;
  designation: string;
  content: string;
  image: {
    data: Buffer;
    contentType: string;
  };
  linkedIn: string;
  currentEmployer: string;
  currentPosition: string;
  approved?: boolean;
  star: number;
};
