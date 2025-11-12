import dbConfig from "@/config/db.config";
import sendEmail from "@/config/ticketEmail";
import Ticket from "@/models/Ticket";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  const ticket = new Ticket({
    name,
    email,
    message,
  });

  try {
    const newTicket = await ticket.save();

    if (newTicket) {
      await sendEmail(email, name, message, newTicket);
      return NextResponse.json(
        { message: "Ticket submitted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to submit ticket" },
        { status: 500 }
      );
    }
  } catch (er) {
    console.log(er);
    return NextResponse.json(
      { message: "An error occurred while submitting the ticket" },
      { status: 500 }
    );
  }
}
