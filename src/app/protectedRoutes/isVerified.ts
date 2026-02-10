import { redirect } from "react-router";

export function isVerified() {
  const userString = localStorage.getItem("user");
  if (!userString) return redirect("/login");

  const user = JSON.parse(userString);
  if (!user.user.isEmailVerified) {
    return redirect("/user/profile/edit-profile");
  }

  return null;
}
