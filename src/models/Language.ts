import mongoose, { Schema } from "mongoose";

const LanguageModel = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Frontend",
      "Backend",
      "Database",
      "Languages",
      "Tools",
      "AI/ML Frameworks",
    ],
  },
  skills: [
    {
      name: {
        type: String,
        required: true,
      },
      iconUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

const Language =
  mongoose.models.Language || mongoose.model("Language", LanguageModel);
export default Language;
