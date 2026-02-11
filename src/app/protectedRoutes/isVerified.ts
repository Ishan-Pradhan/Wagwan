import { store } from "stores/store";
import { redirect } from "react-router";

export function isVerified() {
  const state = store.getState();
  const { user } = state.auth;

  if (!user) return redirect("/login");

  if (!user.isEmailVerified) {
    return redirect("/user/profile/edit-profile");
  }

  return null;
}
