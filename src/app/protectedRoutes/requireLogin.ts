import { redirect } from "react-router";

// we can't use tanstack query in here because this is loader based route guard
export default async function requireLogin() {
  const persistRoot = localStorage.getItem("persist:root");
  const auth = persistRoot ? JSON.parse(JSON.parse(persistRoot).auth) : null;
  if (!auth.user) return redirect("/login");

  return null;
}
