import { useMutation } from "@tanstack/react-query";
import { updatePhoto } from "../api/updatePhoto";

export const useUpdatePhoto = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      console.log(formData);
      return updatePhoto(formData);
    },
  });
};
