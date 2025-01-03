import mongoose, { Schema } from "mongoose";

const LanguageModel = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Frontend Finesse 🎨",
      "Backend Brilliance ⚙️",
      "Database Dominance 🗃️",
      "Language Loadout 💻",
      "Tool Trove 🧰",
      "AI/ML Arsenal 🤖",
      "Framework Forcefield 🚀",
      "App Crafting 🚀",
    ],
  },
  description: {
    type: String,
    required: true,
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
