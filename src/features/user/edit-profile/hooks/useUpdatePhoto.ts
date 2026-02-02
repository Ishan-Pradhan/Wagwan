import { useMutation } from "@tanstack/react-query";
import { updatePhoto } from "../api/updatePhoto";

export const useUpdatePhoto = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return updatePhoto(formData);
    },
  });
};
