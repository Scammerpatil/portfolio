import Visitor from "@/models/Visitor";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

let cachedVisitorCount: number | null = null;
let lastFetched = 0;
const TTL = 60 * 1000; // 1 minute

export async function GET(req: NextRequest) {
  try {
    const now = Date.now();

    if (cachedVisitorCount !== null && now - lastFetched < TTL) {
      return NextResponse.json(
        { visitorCount: cachedVisitorCount },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
          },
        }
      );
    }
    const visitor = await Visitor.findOneAndUpdate(
      {},
      { $inc: { visitorCount: 1 } },
      { new: true, upsert: true }
    );

    const count = visitor.visitorCount;

    cachedVisitorCount = count;
    lastFetched = now;

    return NextResponse.json(
      { visitorCount: count },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error tracking visitor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
