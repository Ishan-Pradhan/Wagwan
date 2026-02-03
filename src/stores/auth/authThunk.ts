import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "api/api";
import type { User } from "types/LoginTypes";

export const fetchCurrentUser = createAsyncThunk<User | null>(
  "auth/fetchCurrentUser",
  async () => {
    const res = await api.get("/users/current-user");
    if (!res) return null;
    return res.data.data as User;
  },
);

export const logoutUser = createAsyncThunk<void>("auth/logout", async () => {
  await api.post("/users/logout");
});
