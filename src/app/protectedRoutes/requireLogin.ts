import api from "api/api";

import { redirect } from "react-router";

// we can't use tanstack query in here because this is loader based route guard
export default async function requireLogin() {
  try {
    await api.get("/users/current-user");
    return null;
  } catch (err) {
    console.error(err);
    return redirect("/login");
  }
}
