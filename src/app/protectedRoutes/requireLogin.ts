import api from "api/api";
import toast from "react-hot-toast";

import { redirect } from "react-router";

export default async function requireLogin() {
  try {
    await api.get("/users/current-user");

    return null;
  } catch (err) {
    console.error(err);
    toast.error("Please Login first");
    return redirect("/login");
  }
}
