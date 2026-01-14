import axios from "axios";
import toast from "react-hot-toast";

import { redirect } from "react-router";

export default async function requireLogin() {
  try {
    await axios.get("/api/v1/users/current-user", { withCredentials: true });

    return null;
  } catch (err) {
    console.error(err);
    toast.error("Please Login first");
    return redirect("/login");
  }
}
