import mongoose, { Schema } from "mongoose";

const ServiceRequestSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    contactNumber: { type: String, trim: true },
    preferredCommunication: {
      type: String,
      enum: ["Email", "Phone", "WhatsApp", "Other"],
      default: "Email",
    },
    projectTitle: { type: String, required: true, trim: true },
    projectDescription: { type: String },
    projectPurpose: { type: String },
    deadline: { type: String },
    preferredTechnologies: [{ type: String }],
    expectedFeatures: { type: String },
    educationalField: { type: String },
    guidelines: { type: String },
    projectComplexity: {
      type: String,
      enum: ["Basic", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    designPreferences: { type: String },
    referenceProject: { type: String },
    budget: { type: String },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Bank Transfer", "PayPal", "Other"],
      default: "UPI",
    },
    activelyInvolved: { type: Boolean, default: true },
    regularUpdates: { type: Boolean, default: true },
    additionalInfo: { type: String },
    termsAccepted: { type: Boolean, required: true },
    portfolioAuthorization: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const ServiceRequest =
  mongoose.models.ServiceRequest ||
  mongoose.model("ServiceRequest", ServiceRequestSchema);

export default ServiceRequest;
