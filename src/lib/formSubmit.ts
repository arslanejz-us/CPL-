export interface FormSubmitResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function submitFormViaAjax(
  formData: FormData | Record<string, any>,
  endpoint: string = "/api/form-submit",
  redirectUrl?: string
): Promise<FormSubmitResponse> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    let body: string;
    if (formData instanceof FormData) {
      body = JSON.stringify(Object.fromEntries(formData));
    } else {
      body = JSON.stringify(formData);
    }

    const parsedBody = JSON.parse(body);
    console.log("📤 Form Submission - Request:", {
      endpoint,
      data: parsedBody,
      timestamp: new Date().toISOString(),
    });

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: FormSubmitResponse = await response.json();
    console.log("✅ Form Submission - Response:", {
      endpoint,
      response: result,
      timestamp: new Date().toISOString(),
    });

    if (result.success && redirectUrl) {
      window.location.href = redirectUrl;
    }

    return result;
  } catch (error) {
    console.error("❌ Form submission error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export function getFormData(form: HTMLFormElement): Record<string, any> {
  const formData = new FormData(form);
  const data: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (key in data) {
      // Handle multiple values for the same key
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  }

  return data;
}
