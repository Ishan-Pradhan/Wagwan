import api from "api/api";
import toast from "react-hot-toast";

import { redirect } from "react-router";

// we can't use tanstack query in here because this is loader based route guard
export default async function requireLogin() {
  try {
    const res = await api.get("/users/current-user");

    if (!res) {
      toast.error("Please Login first");
    }

    return null;
  } catch (err) {
    console.error(err);
    return redirect("/login");
  }
}
