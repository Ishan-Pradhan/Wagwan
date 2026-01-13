import { useState } from "react";
import type { AuthContextType } from "types/AuthContextType";
import type { User } from "types/LoginTypes";
import { AuthContext } from "context/auth/AuthContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : undefined;
  });

  const isLoggedIn = !!user;

  const value: AuthContextType = {
    user,
    setUser,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
