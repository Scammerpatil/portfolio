import ServiceRequest from "@/models/Service";
import { NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

// ---------- CACHE SETUP ----------
let cachedRequests: any = null;
let lastFetched = 0;
const TTL = 10 * 60 * 1000; // 10 minutes cache

export async function GET() {
  try {
    const now = Date.now();

    // ✅ Serve cached data if still fresh
    if (cachedRequests && now - lastFetched < TTL) {
      return NextResponse.json(cachedRequests, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        },
      });
    }

    // ⚙️ Fetch from DB if cache expired
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });

    // ✅ Update cache
    cachedRequests = requests;
    lastFetched = now;

    return NextResponse.json(requests, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
