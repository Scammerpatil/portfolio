import Project from "@/models/Project";
import { NextResponse } from "next/server";
import dbConfig from "@/middleware/db.config";
import Language from "@/models/Language";
import Review from "@/models/Review";
import Visitor from "@/models/Visitor";

dbConfig();

export async function GET() {
  const languages = await Language.find({});
  const reviews = await Review.find({});
  const projects = await Project.find({});
  const visitorCount = await Visitor.countDocuments();
  return NextResponse.json({
    languages,
    testimonials: reviews,
    projects,
    visitorCount,
  });
}
