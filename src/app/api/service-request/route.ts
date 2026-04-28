import ServiceRequest from "@/models/Service";
import { NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

// ---------- CACHE SETUP ----------
let cachedRequests: any = null;
let lastFetched = 0;
const TTL = 10 * 60 * 1000; // 10 minutes cache
const isDev = process.env.NODE_ENV === "development";

const cacheHeaders = isDev
  ? { "Cache-Control": "no-store" }
  : { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120" };

export async function GET() {
  try {
    const now = Date.now();

    // ✅ Serve cached data if still fresh
    if (!isDev && cachedRequests && now - lastFetched < TTL) {
      return NextResponse.json(cachedRequests, {
        status: 200,
        headers: {
          ...cacheHeaders,
        },
      });
    }

    // ⚙️ Fetch from DB if cache expired
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });

    // ✅ Update cache
    if (!isDev) {
      cachedRequests = requests;
      lastFetched = now;
    }

    return NextResponse.json(requests, {
      status: 200,
      headers: {
        ...cacheHeaders,
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
