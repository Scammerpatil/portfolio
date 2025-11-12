import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  linkedIn: {
    type: String,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  currentEmployer: {
    type: String,
    required: false,
  },
  currentPosition: {
    type: String,
    required: false,
  },
  star: {
    type: Number,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
