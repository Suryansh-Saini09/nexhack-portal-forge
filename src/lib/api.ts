const FALLBACK_BACKEND = 'https://websitebackend-w5m9.onrender.com';

export async function postApi(endpoint: string, body: Record<string, any>) {
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
  const primaryUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint;
  const fallbackUrl = `${FALLBACK_BACKEND}${endpoint}`;

  const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs = 7000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  const reqOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  // Try 1: Primary URL (/api/...)
  try {
    const res = await fetchWithTimeout(primaryUrl, reqOptions, 6000);
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } else {
      console.warn(`Primary API ${primaryUrl} returned HTTP status ${res.status}`);
    }
  } catch (err) {
    console.warn(`Primary API request to ${primaryUrl} failed/timed out:`, err);
  }

  // Try 2: Fallback URL (Render remote server)
  try {
    const res = await fetchWithTimeout(fallbackUrl, reqOptions, 15000);
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    }
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Server returned HTTP ${res.status}`);
  } catch (err: any) {
    console.error(`Fallback API request to ${fallbackUrl} failed:`, err);
    throw new Error(err.message || 'Unable to connect to the server. Please try again.');
  }
}
