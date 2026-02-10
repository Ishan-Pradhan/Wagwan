import { redirect } from "react-router";

// we can't use tanstack query in here because this is loader based route guard
export default async function requireLogin() {
  const user = localStorage.getItem("user");
  if (!user) return redirect("/login");

  return null;
}
