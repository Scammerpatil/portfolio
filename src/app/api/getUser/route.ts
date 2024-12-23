import { NextResponse } from "next/server";
import dbConfig from "@/middleware/db.config";
import Language from "@/models/Language";
import Review from "@/models/Review";

dbConfig();

export async function GET() {
  const languages = await Language.find({});
  const reviews = await Review.find({});
  return NextResponse.json({ languages, testimonials: reviews });
}
