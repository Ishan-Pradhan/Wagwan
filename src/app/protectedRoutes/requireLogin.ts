import { store } from "stores/store";
import { fetchCurrentUser } from "stores/auth/authThunk";
import { redirect } from "react-router";

export default async function requireLogin({ request }: { request: Request }) {
  const state = store.getState();
  const { user } = state.auth;

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

  // If user is already loaded, proceed
  if (user) return null;

  try {
    // Attempt to fetch current user (thunk is deduplicated)
    const resultAction = await store.dispatch(fetchCurrentUser());

    // Check if the request was successful
    if (fetchCurrentUser.fulfilled.match(resultAction)) {
      if (resultAction.payload) {
        return null;
      }
    }

    // If not fulfilled or no user data, redirect to login
    return redirect("/login");
  } catch (error) {
    console.error("Require login check failed:", error);
    return redirect("/login");
  }
}
