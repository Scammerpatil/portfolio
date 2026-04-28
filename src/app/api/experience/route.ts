import Experience from "@/models/Experience";
import { NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

let cachedExperience: any = null;
let lastFetched = 0;
const TTL = 30 * 60 * 1000;
const isDev = process.env.NODE_ENV === "development";

const cacheHeaders = isDev
  ? { "Cache-Control": "no-store" }
  : { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300" };

export async function GET() {
  try {
    const now = Date.now();
    if (!isDev && cachedExperience && now - lastFetched < TTL) {
      return NextResponse.json(cachedExperience, {
        status: 200,
        headers: {
          ...cacheHeaders,
        },
      });
    }

    const experience = await Experience.find().sort({ startDate: -1 });
    if (!isDev) {
      cachedExperience = experience;
      lastFetched = now;
    }

    return NextResponse.json(experience, {
      status: 200,
      headers: {
        ...cacheHeaders,
      },
    });
  } catch (error) {
    console.error("Failed to fetch experience:", error);
    return NextResponse.json(
      { message: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}
