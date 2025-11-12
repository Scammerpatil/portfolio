import mongoose, { model, Schema } from "mongoose";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    default: "",
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = mongoose.models.Blog || model("Blog", BlogSchema);

export default Blog;
