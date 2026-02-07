const API_BASE = import.meta.env.VITE_API_BASE;
if (!API_BASE) throw new Error("VITE_API_BASE is not defined in .env");
console.log("API_BASE:", API_BASE);

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body, isForm = false) {
  const headers = getAuthHeaders();
  if (!isForm) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: isForm ? body : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}
