import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const reviewId = searchParams.get("id");

    if (!reviewId) {
      return NextResponse.json(
        { message: "Review ID is required" },
        { status: 400 }
      );
    }
    await Review.findByIdAndUpdate(reviewId, { approved: true });
    return NextResponse.json(
      { message: "Review approved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error approving review:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
