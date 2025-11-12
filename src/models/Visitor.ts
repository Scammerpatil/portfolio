import mongoose, { Schema } from "mongoose";

const VisitorModel = new Schema(
  {
    visitorCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", VisitorModel);

export default Visitor;
