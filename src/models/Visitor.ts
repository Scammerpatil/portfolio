import mongoose, { Schema } from "mongoose";

const VisitorModel = new Schema({
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", VisitorModel);

export default Visitor;
