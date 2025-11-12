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
      return;
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
    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + res.response);
    // Send mail to self as well
    const selfMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Service Request Submitted",
      html: ejs.render(emailTemplate, { name, request }),
    };
    const selfRes = await transporter.sendMail(selfMailOptions);
    console.log("Self email sent: " + selfRes.response);
  } catch (error) {
    return error;
  }
};

export default sendServiceRequestEmail;
