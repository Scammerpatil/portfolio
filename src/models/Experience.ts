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
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
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
