import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "@components/ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import PostImagePreview from "./PostImagePreview";
import { useCreatePost } from "../hooks/useCreatePost";
import type { ImageItem } from "../CreatePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import Button from "@components/ui/Button";

interface Props {
  images: ImageItem[];
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  mode: "create" | "edit";
  postId?: string;
  onBack: () => void;
  onClose: () => void;
}

function AddContent({
  images,
  mode,
  postId,
  onBack,
  onClose,
  setImages,
}: Props) {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();
  const queryClient = useQueryClient();

  const create = useCreatePost();
  const update = useUpdatePost(postId);

  const mutation = mode === "edit" ? update : create;

  const handleSubmit = async () => {
    const valid = await trigger();
    if (!valid) return;

    const data = getValues();

    const formData = new FormData();

    formData.append("content", data.content);

    data.tags.forEach((t: string) => formData.append("tags[]", t));

    images
      .filter((i) => i.type === "new")
      .forEach((i) => {
        formData.append("images", i.file);
      });

    if (mode === "edit") {
      formData.append(
        "existingImages",
        JSON.stringify(
          images.filter((i) => i.type === "existing").map((i) => i._id),
        ),
      );
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success(mode === "edit" ? "Post updated" : "Post created");
        onClose();
        queryClient.invalidateQueries({ queryKey: ["feed"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <PostImagePreview
          images={images}
          forAddImage={false}
          setImages={setImages}
          postId={postId}
        />
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <textarea
          {...register("content")}
          placeholder="Write something..."
          className={`border p-2 flex-1 ${errors.content ? "border-red-500" : ""}`}
        />
        {errors.content && (
          <p className="text-red-500 text-xs">
            {errors.content.message as string}
          </p>
        )}

        <input
          {...register("tags", {
            setValueAs: (v) =>
              typeof v === "string"
                ? v
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t !== "")
                : [],
          })}
          placeholder="tags, comma separated"
          className={`border p-2 ${errors.tags ? "border-red-500" : ""}`}
        />
        {errors.tags && (
          <p className="text-red-500 text-xs">
            {errors.tags.message as string}
          </p>
        )}

        <div className="flex justify-between items-center mt-auto">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Back
          </button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="self-end flex justify-center  bg-primary-500 px-4 py-2 text-white  gap-2"
          >
            {mode === "edit" ? "Update" : "Post"}
            {mutation.isPending && <Spinner />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddContent;
