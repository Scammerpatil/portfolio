import mongoose, { Schema } from "mongoose";

const UserModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  stack: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  socialLinks: [
    {
      link: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserModel);

export default User;
