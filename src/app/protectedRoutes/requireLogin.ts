import api from "api/api";
import { redirect } from "react-router";

export default async function requireLogin() {
  try {
    await api.get("/users/current-user");

    return null;
  } catch (error) {
    if (error) {
      return redirect("/login");
    }
    throw error;
  }
}
