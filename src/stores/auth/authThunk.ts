import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "api/api";
import type { User } from "types/LoginTypes";

export const fetchCurrentUser = createAsyncThunk<User>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/current-user");
      return res.data.data as User;
    } catch (err) {
      console.error(err);
      return rejectWithValue(null);
    }
  },
);

export const logoutUser = createAsyncThunk<void>("auth/logout", async () => {
  await api.post("/users/logout");
});
