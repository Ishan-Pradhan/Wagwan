import { useEffect, useState } from "react";
import { AuthContext } from "context/auth/AuthContext";
import axios from "axios";
import type { User } from "types/LoginTypes";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/v1/users/current-user", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const logout = async () => {
    await axios.post("/api/v1/users/logout", {}, { withCredentials: true });
    window.location.replace("/login");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
