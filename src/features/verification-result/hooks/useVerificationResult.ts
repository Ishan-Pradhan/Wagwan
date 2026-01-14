import { useMutation } from "@tanstack/react-query";
import { verificationResult } from "../api/verification-result";

export const useVerificationResult = () =>
  useMutation({
    mutationFn: verificationResult,
  });
