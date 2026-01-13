import toast from "react-hot-toast";
import { redirect } from "react-router";

export default function requireLogin() {
  const isLoggedIn = localStorage.getItem("user");
  if (!isLoggedIn) {
    toast.error("Please Login first");
    throw redirect("/login");
  }
  return null;
}
