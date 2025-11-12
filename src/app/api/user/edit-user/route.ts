import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { user } = await req.json();
  const data = {
    name: user.name,
    bio: user.bio,
    stack: user.stack,
    email: user.email,
    phone: user.phone,
    socialLinks: user.socialLinks,
  };
  try {
    await User.updateOne({ _id: "676bdfbc0d450dc554dfb25c" }, { $set: data });
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
