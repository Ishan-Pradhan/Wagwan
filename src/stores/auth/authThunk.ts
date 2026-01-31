import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "api/api";
import type { User } from "types/LoginTypes";

export const fetchCurrentUser = createAsyncThunk<User>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/current-user");
      return res.data.data as User;
    } catch (error) {
      if (error) return rejectWithValue(null);
      throw error;
    }
  },
);

export const logoutUser = createAsyncThunk<void>("auth/logout", async () => {
  await api.post("/users/logout");
});
