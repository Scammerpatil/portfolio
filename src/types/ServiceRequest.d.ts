export interface ServiceRequest {
  _id?: string;
  fullName: string;
  email: string;
  contactNumber?: string;
  preferredCommunication?: "Email" | "Phone" | "WhatsApp" | "Other";
  projectTitle: string;
  projectDescription?: string;
  projectPurpose?: string;
  deadline?: string;
  preferredTechnologies?: string[];
  expectedFeatures?: string;
  educationalField?: string;
  guidelines?: string;
  projectComplexity?: "Basic" | "Intermediate" | "Advanced";
  designPreferences?: string;
  referenceProject?: string;
  budget?: string;
  paymentMethod?: "UPI" | "Bank Transfer" | "PayPal" | "Crypto" | "Other";
  activelyInvolved?: boolean;
  regularUpdates?: boolean;
  additionalInfo?: string;
  termsAccepted: boolean;
  portfolioAuthorization: boolean;
  createdAt?: Date;
}
