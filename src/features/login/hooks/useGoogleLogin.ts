import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../api/loginWithGoogle";

export const useGoogleLogin = () =>
  useMutation({
    mutationFn: loginWithGoogle,
  });
