import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { user } = await req.json();
  try {
    await User.findOneAndUpdate(user);
    return NextResponse.json(
      { message: "User Updated Successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
