import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/updateProfile";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return updateProfile(formData);
    },
  });
};
