import api from "api/api";

import { redirect } from "react-router";

// we can't use tanstack query in here because this is loader based route guard
export default async function requireLogin({ request }: { request: Request }) {
  // Check for OAuth tokens in URL
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("accessToken");
  const refreshToken = url.searchParams.get("refreshToken");

  // If OAuth tokens are present, store them and redirect to clean URL
  if (accessToken && refreshToken) {
    // Store tokens in cookies
    document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=none`;
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=none`;

    // Redirect to clean URL (same path without query params)
    return redirect(url.pathname);
  }

  try {
    await api.get("/users/current-user");
    return null;
  } catch (err) {
    console.error(err);
    return redirect("/login");
  }
}
