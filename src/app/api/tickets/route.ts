import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

let cachedTickets: any = null;
let lastFetched = 0;
const TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  try {
    const now = Date.now();
    if (cachedTickets && now - lastFetched < TTL) {
      return NextResponse.json(cachedTickets, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        },
      });
    }

    const tickets = await Ticket.find().sort({ createdAt: -1 });
    cachedTickets = tickets;
    lastFetched = now;

    return NextResponse.json(tickets, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Error while fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
