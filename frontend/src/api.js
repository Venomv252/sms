const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const USER_KEY = "sms_authenticated_user";
const ACTIVE_SCHOOL_KEY = "sms_active_school_id";

// Track ongoing refresh request to prevent concurrent refreshes
let refreshPromise = null;

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
    credentials: "include", // Send cookies
    body: JSON.stringify({
      username: username.trim(),
      password,
    }),
  });

  const result = await parseResponse(response);

  if (!result?.user) {
    throw new Error("The API response did not include user data.");
  }

  // Clear active school on login
  sessionStorage.removeItem(ACTIVE_SCHOOL_KEY);
  
  // Store user data (tokens are in httpOnly cookies)
  sessionStorage.setItem(USER_KEY, JSON.stringify(result.user));

  return result;
}

/**
 * Clear the current session and notify the React application.
 */
function expireApiSession() {
  clearApiSession();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sms:session-expired"));
  }
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken() {
  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // Send refresh token cookie
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      return true;
    } catch (error) {
      // Refresh failed - user needs to log in again
      expireApiSession();
      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Central API request handler with automatic token refresh
 */
export async function apiRequest(path, options = {}) {
  const makeRequest = async () => {
    return fetch(
      `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
      {
        ...options,
        credentials: "include", // Always send cookies
        headers: {
          ...(options.body ? { "Content-Type": "application/json" } : {}),
          ...(sessionStorage.getItem(ACTIVE_SCHOOL_KEY)
            ? {
                "X-School-Id": sessionStorage.getItem(ACTIVE_SCHOOL_KEY),
              }
            : {}),
          ...(options.headers || {}),
        },
      },
    );
  };

  let response = await makeRequest();

  // If 401 and not already a refresh attempt, try to refresh token
  if (response.status === 401 && !path.includes("/auth/refresh")) {
    try {
      await refreshAccessToken();
      // Retry original request with new access token
      response = await makeRequest();
    } catch {
      // Refresh failed, don't retry
      expireApiSession();
    }
  }

  // If still 401 after refresh attempt, session expired
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

export async function apiPut(path, body) {
  return apiRequest(path, {
    method: "PUT",
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
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(ACTIVE_SCHOOL_KEY);
}

export function hasApiSession() {
  // With httpOnly cookies, we check if user data exists
  // The actual auth state is managed by cookies
  return Boolean(sessionStorage.getItem(USER_KEY));
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
