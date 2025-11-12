import Ticket from "@/models/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { ticketId, status } = await req.json();
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    ticket.status = status;
    await ticket.save();
    return NextResponse.json({ message: "Ticket status updated successfully" });
  } catch (error) {
    console.log("Something went wrong!!!", error);
    return NextResponse.json(
      { error: "Failed to update ticket status" },
      { status: 500 }
    );
  }
}
