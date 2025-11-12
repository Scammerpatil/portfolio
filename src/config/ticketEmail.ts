import Nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import { Ticket } from "@/types/Ticket";

const transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (
  email: string,
  name: string,
  message: string,
  ticket: Ticket
) => {
  try {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid recipient email address");
    }

    const emailTemplate = fs.readFileSync(
      "src/helper/ticketEmail.ejs",
      "utf-8"
    );
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Ticket Created",
      html: ejs.render(emailTemplate, { name, message, ticket }),
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export default sendEmail;
