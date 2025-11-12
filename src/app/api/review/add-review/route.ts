import dbConfig from "@/config/db.config";
import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

dbConfig();

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const linkedIn = formData.get("linkedIn");
  const content = formData.get("content");
  const designation = formData.get("designation");
  const star = formData.get("star");
  let image = formData.get("image") as File | null;
  const currentPosition = formData.get("currentPosition");
  const currentEmployer = formData.get("currentEmployer");
  if (
    !name ||
    !email ||
    !content ||
    !designation ||
    !star ||
    !currentPosition ||
    !currentEmployer
  ) {
    return NextResponse.json(
      { message: "All fields are required. Please fill in all the details." },
      { status: 400 }
    );
  }
  let imageBuffer;
  if (!image) {
    const dummyImage = path.join(
      process.cwd(),
      "public",
      "images",
      "dummy.jpg"
    );
    imageBuffer = {
      data: fs.readFileSync(dummyImage),
      contentType: "image/jpeg",
    };
  } else {
    imageBuffer = {
      data: Buffer.from(await image.arrayBuffer()),
      contentType: image.type,
    };
  }
  const review = new Review({
    name,
    email,
    linkedIn,
    designation,
    content,
    star,
    image: imageBuffer,
    currentPosition,
    currentEmployer,
  });
  const newReview = await review.save();
  if (newReview) {
    return NextResponse.json(newReview, { status: 201 });
  } else {
    return NextResponse.json(
      { message: "Review not saved. Please try again" },
      { status: 400 }
    );
  }
}
