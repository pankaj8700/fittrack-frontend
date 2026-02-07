import { apiPost } from "./client";

export function registerUser(data) {
  return apiPost("/api/register", data);
}

export function loginUser({ email, password }) {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  return apiPost("/api/login", form, true);
}
