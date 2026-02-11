import { redirect } from "react-router";

export function isVerified() {
  const persistRoot = localStorage.getItem("persist:root");
  const auth = persistRoot ? JSON.parse(JSON.parse(persistRoot).auth) : null;
  if (!auth) return redirect("/login");

  const user = auth.user;
  if (!user.isEmailVerified) {
    return redirect("/user/profile/edit-profile");
  }

  return null;
}
