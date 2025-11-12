import dbConfig from "@/config/db.config";
import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const reviewId = formData.get("reviewId");
    const name = formData.get("name");
    const email = formData.get("email");
    const linkedIn = formData.get("linkedIn");
    const designation = formData.get("designation");
    const content = formData.get("content");
    const currentEmployer = formData.get("currentEmployer");
    const currentPosition = formData.get("currentPosition");
    const star = formData.get("star");
    const image = formData.get("image") as File | null;
    const exisitingReview = await Review.findById(reviewId);

    if (!exisitingReview) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }
    await Review.findByIdAndUpdate(reviewId, {
      name,
      email,
      linkedIn,
      designation,
      content,
      currentEmployer,
      currentPosition,
      star,
      image: {
        data: image
          ? Buffer.from(await image.arrayBuffer())
          : exisitingReview.image.data,
        contentType: image ? image.type : exisitingReview.image.contentType,
      },
    });
    return NextResponse.json(
      { message: "Review updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
