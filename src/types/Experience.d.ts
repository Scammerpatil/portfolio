export interface Experience {
  _id?: string;
  role: string;
  image: {
    data: Buffer;
    contentType: string;
  };
  company: string;
  startDate: Date;
  endDate?: Date;
  desc: string;
  skills: string[];
  companyURL: string;
}
