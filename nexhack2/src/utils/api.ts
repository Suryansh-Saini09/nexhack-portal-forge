const FALLBACK_BACKEND = "http://localhost:4000";

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timer);

    return response;
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  [key: string]: any;
}

export async function postApi(
  endpoint: string,
  body: Record<string, any>
): Promise<ApiResponse> {
  const configuredUrl = (
    import.meta as any
  ).env?.VITE_API_URL;

  const baseUrl = configuredUrl
    ? configuredUrl.replace(/\/$/, "")
    : FALLBACK_BACKEND;

  const url = `${baseUrl}${endpoint}`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetchWithTimeout(
      url,
      requestOptions,
      15000
    );

    const contentType =
      response.headers.get("content-type") || "";

    let data: ApiResponse | null = null;

    if (contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`
      );
    }

    if (!data) {
      throw new Error("Invalid response from backend.");
    }

    if (data.success === false) {
      throw new Error(
        data.message ||
          data.error ||
          "Request failed."
      );
    }

    return data;
  } catch (error) {
    console.error(
      `NexHack API request failed: ${endpoint}`,
      error
    );

    throw error;
  }
}