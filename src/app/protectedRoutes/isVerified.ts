import api from "api/api";
import { redirect } from "react-router";

export default async function isVerified() {
  try {
    const user = await api.get("/users/current-user");
    console.log(user);
    const emailVerified = user.data.data.isEmailVerified;
    if (emailVerified) return emailVerified;

    if (!emailVerified) return redirect(`/user/profile/edit-profile`);
  } catch (err) {
    console.error(err);
  }
}
