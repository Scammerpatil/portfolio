import Experience from "@/models/Experience";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const searchParmas = req.nextUrl.searchParams;
    const id = searchParmas.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required." },
        { status: 400 }
      );
    }
    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) {
      return NextResponse.json(
        { error: "Experience not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Experience deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience." },
      { status: 500 }
    );
  }
}
