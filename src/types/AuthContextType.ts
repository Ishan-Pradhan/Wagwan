import type { User } from "types/LoginTypes";

export type AuthContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isLoggedIn: boolean;
};
