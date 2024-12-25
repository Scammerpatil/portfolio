import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { formData } = await req.json();
  if (
    formData.email === "sauravpatil453@gmail.com" &&
    formData.password === "Saudip@123"
  ) {
    // Set Cookies
    const response = NextResponse.json({ message: "Success" });
    response.cookies.set("isAuthenticated", "true");
    return response;
  }
  return NextResponse.json({ message: "Failed" });
}
