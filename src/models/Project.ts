import mongoose, { Schema } from "mongoose";

const ProjectModel = new Schema(
  {
    // Basic Project Information
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },

    // Challenge and Solution
    challenge: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },

    // Project Media
    bannerImage: {
      data: Buffer,
      contentType: String,
    },
    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],

    // Project Status
    liveLink: {
      type: String,
    },

    // Technologies
    technologies: [
      {
        stack: {
          type: String,
          required: true,
        },
        technologies: {
          type: [String],
          required: true,
        },
      },
    ],

    // Features
    features: {
      type: [String],
      required: true,
    },

    github: {
      type: String,
      required: true,
    },

    envVariables: {
      type: [String],
    },

    // Testimonial
    testimonial: {
      clientFeedback: {
        type: String,
        required: false,
      },
      clientName: {
        type: String,
        required: false,
      },
    },

    // Stack Type
    stack: {
      type: String,
      required: true,
      enum: [
        "MERN Magic ✨",
        "MEAN Machine 💻",
        "Spring-Run 🏃",
        "Next Level 🆙",
        "Flask Forge 🔥",
        "Brainy Bots 🤖",
        "Extension X 🚀",
        "Java Jolt ⚡",
        "PHP Power ⚙️",
        "Django Dynamo 🌐",
        "Blockchain Builders ⛓️",
      ],
    },

    // Comments and Likes
    comments: [
      {
        user: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    approved:{
      type: Boolean,
      default: false,
    },

    likes: {
      type: Number,
      default: 0,
    },

    // Date of Creation
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectModel);

export default Project;
