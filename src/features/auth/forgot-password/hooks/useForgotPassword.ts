import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/forgot-password";

export const useForgotPassword = () =>
  useMutation({
    mutationFn: forgotPassword,
  });
