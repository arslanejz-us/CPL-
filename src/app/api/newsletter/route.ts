import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const listId = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID;
    const datacenter = process.env.NEXT_PUBLIC_MAILCHIMP_DATACENTER;
    const apiKey = process.env.MAILCHIMP_API_KEY;

    if (!listId || !datacenter || !apiKey) {
      console.error("Mailchimp environment variables not configured");
      return NextResponse.json(
        {
          success: false,
          message:
            "Newsletter subscription is not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Mailchimp API endpoint
    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`apikey:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Successfully subscribed! Check your email for confirmation.",
        },
        { status: 200 }
      );
    }

    // Handle already subscribed case
    if (data.title === "Member Exists") {
      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed to our newsletter!",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: data.detail || "Failed to subscribe. Please try again.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An error occurred during subscription.",
      },
      { status: 500 }
    );
  }
}
