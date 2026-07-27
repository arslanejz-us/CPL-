import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields based on form type
    const { formType = "general", ...formData } = data;

    // Basic validation - check for Email field (capital E as sent from form)
    if (!formData.Email && !formData.email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Log form submission
    console.log(`📤 ${formType} form submission:`, formData);

    // TODO: Send email or save to database
    // For now, just return success
    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully! We'll get back to you soon.",
        data: { id: Date.now() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form. Please try again.",
      },
      { status: 500 }
    );
  }
}
