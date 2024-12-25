import Ticket from "@/models/Ticket";
import { NextRequest, NextResponse } from "next/server";
import ticketEmail from "@/middleware/ticketEmail";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return { status: 400, json: { message: "Please fill all the fields" } };
  }
  const ticket = new Ticket({
    name,
    email,
    message,
  });
  const newTicket = await ticket.save();
  if (newTicket) {
    await ticketEmail(email, name, message, newTicket);
    return NextResponse.json(
      { message: "Ticket submitted successfully" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Failed to submit ticket" },
    { status: 500 }
  );
}
