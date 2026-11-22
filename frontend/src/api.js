const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const TOKEN_KEY = "sms_access_token";
const USER_KEY = "sms_authenticated_user";
const ACTIVE_SCHOOL_KEY = "sms_active_school_id";

async function parseResponse(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || `Request failed (${response.status})`);
  }

  return payload?.data ?? payload;
}

export async function loginUser(username, password) {
  if (!username?.trim() || !password) {
    throw new Error("Enter your username and password.");
  }

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.trim(),
      password,
    }),
  });

  const result = await parseResponse(response);

  if (!result?.token || !result?.user) {
    throw new Error(
      "The API response did not include a user and access token.",
    );
  }

  sessionStorage.removeItem(ACTIVE_SCHOOL_KEY);
  sessionStorage.setItem(TOKEN_KEY, result.token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(result.user));

  return result;
}

/**
 * Clear the current session and notify the React application.
 * This ensures the dashboard is unmounted when authentication expires.
 */
function expireApiSession() {
  clearApiSession();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sms:session-expired"));
  }
}

/**
 * Decode JWT expiry without verifying its signature.
 * The backend remains responsible for token verification.
 */
function getTokenExpiry(token) {
  try {
    const payload = token.split(".")[1];

    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const decoded = JSON.parse(
      atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
    );

    return typeof decoded.exp === "number" ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}

/**
 * Check token expiry when the application starts
 * and when the browser tab becomes active.
 */
export function checkApiSessionExpiry() {
  const token = sessionStorage.getItem(TOKEN_KEY);

  if (!token) return false;

  const expiry = getTokenExpiry(token);

  // If the token has no readable expiry, let the backend validate it.
  if (expiry === null) return true;

  if (Date.now() >= expiry) {
    expireApiSession();
    return false;
  }

  return true;
}

/**
 * Central API request handler.
 */
export async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem(TOKEN_KEY);

  if (!token) {
    expireApiSession();

    throw new Error("Your session has expired. Please log in again.");
  }

  // Check expiry before sending a request.
  if (!checkApiSessionExpiry()) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const response = await fetch(
    `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
        ...(sessionStorage.getItem(ACTIVE_SCHOOL_KEY)
          ? {
              "X-School-Id": sessionStorage.getItem(ACTIVE_SCHOOL_KEY),
            }
          : {}),
        ...(options.headers || {}),
      },
    },
  );

  if (response.status === 401) {
    expireApiSession();
  }

  return parseResponse(response);
}

export async function apiGet(path) {
  return apiRequest(path, { method: "GET" });
}

export async function apiPost(path, body) {
  return apiRequest(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiPatch(path, body) {
  return apiRequest(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function apiDelete(path) {
  return apiRequest(path, { method: "DELETE" });
}

/**
 * Clear authentication and active school information.
 */
export function clearApiSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(ACTIVE_SCHOOL_KEY);
}

export function hasApiSession() {
  return Boolean(sessionStorage.getItem(TOKEN_KEY));
}

export function setActiveSchoolId(schoolId) {
  if (schoolId) {
    sessionStorage.setItem(ACTIVE_SCHOOL_KEY, schoolId);
  } else {
    sessionStorage.removeItem(ACTIVE_SCHOOL_KEY);
  }
}

export function getActiveSchoolId() {
  return sessionStorage.getItem(ACTIVE_SCHOOL_KEY);
}

export { API_BASE_URL };
