const BASE = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_API_URL || "" : process.env.NEXT_PUBLIC_API_URL || "";

async function handleJSONResponse(res) {
  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) {
      const err = { status: res.status, ...json };
      throw err;
    }
    return json;
  } catch (e) {
    if (!res.ok) {
      throw { status: res.status, error: text || res.statusText };
    }
    return {};
  }
}

export default {
  async postJSON(url, body, headers = {}) {
    const full = url.startsWith("http") ? url : BASE + url;
    const res = await fetch(full, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body)
    });
    return handleJSONResponse(res);
  },

  async getJSON(url, headers = {}) {
    const full = url.startsWith("http") ? url : BASE + url;
    const res = await fetch(full, { headers });
    return handleJSONResponse(res);
  },

  async authFetch(url, options = {}, token) {
    const full = url.startsWith("http") ? url : BASE + url;
    const hdrs = options.headers ? { ...options.headers } : {};
    if (token) hdrs.Authorization = `Bearer ${token}`;
    const res = await fetch(full, { ...options, headers: hdrs });
    if (res.status === 401) {
      throw { status: 401, error: "Unauthorized" };
    }
    return res;
  }
};
