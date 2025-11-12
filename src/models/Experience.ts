import mongoose, { Schema } from "mongoose";

const ExperienceModel = new Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyURL: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
  },
  desc: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", ExperienceModel);
export default Experience;
