import api from "api/api";
import { redirect } from "react-router";

// we can't use tanstack query in here because this is loader based route guard
export default async function requireLogin({ request }: { request: Request }) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("accessToken");
  const refreshToken = url.searchParams.get("refreshToken");

  if (accessToken && refreshToken) {
    document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=none`;
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=none`;

    return redirect(url.pathname);
  }

  try {
    await api.get("/users/current-user", { withCredentials: true });
    return null;
  } catch {
    return redirect("/login");
  }

  return null;
}
