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

  const persistRoot = localStorage.getItem("persist:root");
  const auth = persistRoot ? JSON.parse(JSON.parse(persistRoot).auth) : null;
  if (!auth.user) return redirect("/login");

  return null;
}
