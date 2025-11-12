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
      return;
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
    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + res.response);
  } catch (error) {
    return error;
  }
};

export default sendEmail;
