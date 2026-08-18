async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timer);
  }
}

export async function postApi(
  endpoint: string,
  body: Record<string, any>
) {
  const baseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
    : '';

  // If VITE_API_URL is not set, use the current domain.
  // This allows /api/contact and /api/sponsor to work
  // on the Vercel deployment and custom domain.
  const apiUrl = baseUrl
    ? `${baseUrl}${endpoint}`
    : endpoint;

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetchWithTimeout(
      apiUrl,
      requestOptions,
      10000
    );

    let data: any = null;

    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(
        data?.error ||
          data?.message ||
          `Request failed with status ${response.status}`
      );
    }

    if (!data || data.success !== true) {
      throw new Error(
        data?.error ||
          data?.message ||
          'The server did not confirm the submission.'
      );
    }

    return data;
  } catch (error: any) {
    console.error('[API Request Error]', {
      endpoint,
      error: error?.message || error,
    });

    throw new Error(
      error?.message ||
        'Unable to connect to the server. Please try again later.'
    );
  }
}