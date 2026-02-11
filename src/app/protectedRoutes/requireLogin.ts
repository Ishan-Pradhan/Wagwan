import { store } from "stores/store";
import { fetchCurrentUser } from "stores/auth/authThunk";
import { redirect } from "react-router";

export default async function requireLogin() {
  const state = store.getState();
  const { user } = state.auth;

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
