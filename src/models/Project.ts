import mongoose, { Schema } from "mongoose";

const ProjectModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  live: {
    type: Boolean,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  link: {
    type: String,
  },
  github: {
    type: String,
    required: true,
  },
  stack: {
    type: String,
    required: true,
    enum: [
      "MERN",
      "MEAN",
      "Spring",
      "Next JS",
      "Flask",
      "AI/ML",
      "Web Extension",
      "Java",
      "PHP",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectModel);

export default Project;
