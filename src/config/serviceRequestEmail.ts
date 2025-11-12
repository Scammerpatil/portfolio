import Nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import { ServiceRequest } from "@/types/ServiceRequest";

const transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendServiceRequestEmail = async (
  email: string,
  name: string,
  request: ServiceRequest
) => {
  try {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid recipient email address");
    }

    const emailTemplate = fs.readFileSync(
      "src/helper/serviceRequestEmail.ejs",
      "utf-8"
    );
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Service Request Received",
      html: ejs.render(emailTemplate, { name, request }),
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export default sendServiceRequestEmail;
