import { useFormContext, useWatch } from "react-hook-form";

import { useCreatePost } from "../hooks/useCreatePost";
import toast from "react-hot-toast";
import PostImagePreview from "./PostImagePreview";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@components/ui/Spinner";

interface AddContentPropTypes {
  onBack: () => void;
}

function AddContent({ onBack }: AddContentPropTypes) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext();

  const createPostMutation = useCreatePost();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const isValid = await trigger();

    const data = getValues();

    const formData = new FormData();

    formData.append("content", data.content);

    data.tags.forEach((tag: string) => {
      formData.append("tags[]", tag);
    });
    const images =
      data.images instanceof FileList
        ? Array.from(data.images)
        : Array.isArray(data.images)
          ? data.images
          : [];

    images.forEach((file) => {
      formData.append("images", file);
    });
    if (isValid) {
      createPostMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("posted");
          queryClient.invalidateQueries({ queryKey: ["feed"] });
        },
      });
    }
  };

  const watchedImages = useWatch({
    name: "images",
  });

  const previewImages: File[] =
    watchedImages instanceof FileList
      ? Array.from(watchedImages)
      : Array.isArray(watchedImages)
        ? watchedImages
        : [];

  return (
    <div className="flex flex-col lg:flex-row  gap-2 w-full max-w-lg">
      <div className="w-full">
        <PostImagePreview images={previewImages} />
      </div>
      <div className="flex flex-col gap-3">
        <textarea
          className="p-4 border border-gray-300 rounded-sm"
          rows={10}
          {...register("content")}
          placeholder="Add content"
        ></textarea>
        {errors.content && (
          <p className="text-red-500 text-sm">
            {errors.content.message as string}
          </p>
        )}

        <input
          type="text"
          className="p-4 border border-gray-300 rounded-sm"
          placeholder="Add tags"
          {...register("tags", {
            setValueAs: (val) => {
              if (Array.isArray(val)) return val;
              if (typeof val !== "string") return [];
              return val
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
            },
          })}
        />

        {errors.tags && (
          <p className="text-red-500 text-sm">
            {errors.tags.message as string}
          </p>
        )}
        <div className="flex justify-between">
          <button type="button" onClick={onBack}>
            back
          </button>
          <button
            type="button"
            className="bg-primary-500 hover:bg-primary-600 cursor-pointer text-white"
            onClick={handleSubmit}
          >
            post {createPostMutation.isPending && <Spinner />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddContent;
