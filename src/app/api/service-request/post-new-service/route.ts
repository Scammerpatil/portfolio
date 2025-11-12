import ServiceRequest from "@/models/Service";
import sendServiceRequestEmail from "@/config/serviceRequestEmail";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const { form } = await req.json();
    if (
      !form.fullName ||
      !form.email ||
      !form.projectTitle ||
      !form.projectDescription
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newServiceRequest = new ServiceRequest(form);
    await newServiceRequest.save();
    if (newServiceRequest) {
      await sendServiceRequestEmail(form.email, form.fullName, form);
      return NextResponse.json(
        { message: "Service request submitted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to submit service request" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("Error in POST /service-request/post-new-service:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
