const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
const TOKEN_KEY = "sms_access_token";
let loginPromise = null;

async function parseResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || `Request failed (${response.status})`);
  }
  return payload?.data ?? payload;
}

async function getAccessToken() {
  const existing = sessionStorage.getItem(TOKEN_KEY);
  if (existing) return existing;

  // Local-development convenience for the included seeded demo student.
  // Set VITE_DEMO_EMAIL and VITE_DEMO_PASSWORD in .env.local to override.
  if (!loginPromise) {
    loginPromise = (async () => {
      const email = import.meta.env.VITE_DEMO_EMAIL || "student@example.com";
      const password = import.meta.env.VITE_DEMO_PASSWORD || "ChangeMe123!";
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await parseResponse(response);
      if (!payload?.token) throw new Error("Login succeeded but the API did not return an access token.");
      sessionStorage.setItem(TOKEN_KEY, payload.token);
      return payload.token;
    })().finally(() => {
      loginPromise = null;
    });
  }
  return loginPromise;
}

export async function apiRequest(path, options = {}) {
  const token = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    sessionStorage.removeItem(TOKEN_KEY);
  }
  return parseResponse(response);
}

export async function apiGet(path) {
  return apiRequest(path, { method: "GET" });
}

export async function apiPost(path, body) {
  return apiRequest(path, { method: "POST", body: JSON.stringify(body) });
}

export function clearApiSession() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export { API_BASE_URL };
