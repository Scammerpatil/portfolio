import dbConfig from "@/config/db.config";
import Language from "@/models/Language";
import { NextResponse } from "next/server";

dbConfig();

let cachedLanguages: any = null;
let lastFetched = 0;
const TTL = 30 * 60 * 1000; // 30 minutes

export async function GET() {
  try {
    const now = Date.now();
    if (cachedLanguages && now - lastFetched < TTL) {
      return NextResponse.json(cachedLanguages, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
        },
      });
    }

    const languages = await Language.find();
    cachedLanguages = languages;
    lastFetched = now;

    return NextResponse.json(languages, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Failed to fetch languages:", error);
    return NextResponse.json(
      { message: "Failed to fetch languages." },
      { status: 500 }
    );
  }
}
