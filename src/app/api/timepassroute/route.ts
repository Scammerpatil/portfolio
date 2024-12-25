import { NextRequest, NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/helper/uploadCloudinary";
import Project from "@/models/Project";
import dbConfig from "@/middleware/db.config";
import { ProjectData } from "@/types/Project";

dbConfig();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const formData = await req.formData();
  return NextResponse.json({ formData });
}
