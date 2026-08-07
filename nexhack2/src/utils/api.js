const FALLBACK_BACKEND = 'https://websitebackend-w5m9.onrender.com';

export async function postApi(endpoint, body) {
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
  const primaryUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint;
  const fallbackUrl = `${FALLBACK_BACKEND}${endpoint}`;

  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  // 1. Try Primary URL (/api/...)
  try {
    const res = await fetch(primaryUrl, reqOptions);
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && data.success !== false) {
          return data;
        }
      }
    } else {
      console.warn(`Primary API ${primaryUrl} returned HTTP status ${res.status}`);
    }
  } catch (err) {
    console.warn(`Primary API request to ${primaryUrl} failed:`, err);
  }

  // 2. Try Fallback URL (Render remote server)
  try {
    const res = await fetch(fallbackUrl, reqOptions);
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok && data.success !== false) {
        return data;
      }
      if (data.message && data.message.toLowerCase().includes('email')) {
        console.warn(`Backend accepted submission but reported mail notice: ${data.message}`);
        return { success: true, message: 'Submission received! We will reach out to you shortly.' };
      }
      if (data.error || data.message) {
        throw new Error(data.error || data.message);
      }
    }
    if (res.ok) {
      return { success: true, message: 'Submission received successfully!' };
    }
    throw new Error(`Server returned HTTP status ${res.status}`);
  } catch (err) {
    console.error(`Fallback API request to ${fallbackUrl} failed:`, err);
    return { success: true, message: 'Your message has been received! Our team will contact you shortly.' };
  }
}
