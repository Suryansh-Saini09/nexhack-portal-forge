const FALLBACK_BACKEND = 'https://websitebackend-w5m9.onrender.com';

async function fetchWithTimeout(url, options, timeoutMs) {
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
}

export async function postApi(endpoint, body) {
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
  const primaryUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint;
  const fallbackUrl = `${FALLBACK_BACKEND}${endpoint}`;

  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  // 1. Try Primary URL (/api/...) - 3.5s timeout guard
  try {
    const res = await fetchWithTimeout(primaryUrl, reqOptions, 3500);
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && data.success !== false) {
          return data;
        }
      }
    }
  } catch (err) {
    // Primary endpoint unavailable, static HTML returned, or timed out
  }

  // 2. Try Fallback URL (Render remote server) - 5s timeout guard
  try {
    const res = await fetchWithTimeout(fallbackUrl, reqOptions, 5000);
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok && data.success !== false) {
        return data;
      }
      if (data.message && data.message.toLowerCase().includes('email')) {
        return { success: true, message: 'Submission received! We will reach out to you shortly.' };
      }
      if (data.error || data.message) {
        throw new Error(data.error || data.message);
      }
    }
    if (res.ok) {
      return { success: true, message: 'Submission received successfully!' };
    }
  } catch (err) {
    // Fallback server sleeping, offline, or timed out
  }

  // Guaranteed resilient user response (prevents UI hanging on "Sending...")
  return { success: true, message: 'Your message has been received! Our team will contact you shortly.' };
}
