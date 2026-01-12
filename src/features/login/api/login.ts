import axios from "axios";

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const res = await axios.post("/api/v1/users/login", payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
