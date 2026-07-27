export interface MailchimpResponse {
  success: boolean;
  message: string;
}

export async function subscribeToMailchimp(
  email: string
): Promise<MailchimpResponse> {
  try {
    console.log("📤 Newsletter Subscription - Request:", {
      endpoint: "/api/newsletter",
      email,
      timestamp: new Date().toISOString(),
    });

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data: MailchimpResponse = await response.json();
    console.log("✅ Newsletter Subscription - Response:", {
      endpoint: "/api/newsletter",
      response: data,
      timestamp: new Date().toISOString(),
    });

    return data;
  } catch (error) {
    console.error("❌ Mailchimp subscription error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An error occurred during subscription.",
    };
  }
}
