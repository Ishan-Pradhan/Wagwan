import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { TrashIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { useDeleteImage } from "../hooks/useDeleteImage";
import { useQueryClient } from "@tanstack/react-query";
import type {
  ImageItem,
  PostImagePreviewProps,
} from "../types/CreatePostTypes";

function PostImagePreview({
  images,
  forAddImage = true,
  postId,
  setImages,
}: PostImagePreviewProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    // Generate URLs for previews
    const urls = images.map((img) =>
      img.type === "new" ? img.preview : img.url,
    );
    //eslint-disable-next-line
    setPreviews(urls);
  }, [images]);

  const deleteImageMutation = useDeleteImage();
  const queryClient = useQueryClient();

  const handleDeleteImage = async (image: ImageItem, postId: string) => {
    if (image.type !== "existing") return;
    deleteImageMutation.mutate(
      { image, postId },
      {
        onSuccess: () => {
          setImages((prev) =>
            prev.filter(
              (img) => img.type !== "existing" || img._id !== image._id,
            ),
          );

          toast.success("Image Deleted");
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          queryClient.invalidateQueries({ queryKey: ["posts", postId] });
          queryClient.invalidateQueries({ queryKey: ["feeds"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
      },
    );
  };

  if (!images.length || !previews.length) return null;

  // const handleDeleteImage = async (image: ImageItem) => {
  //   if (image.type !== "existing") return;
  //   try {
  //     const res = await api.patch(
  //       `/social-media/posts/remove/image/${postId}/${image._id}`,
  //     );

  //     if (res.data.success) {
  //       toast.success("Image deleted");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to delete image");
  //   }
  // };

  if (images.length === 1) {
    return (
      <div className="relative mx-auto flex h-full items-center justify-center overflow-hidden rounded-md border border-gray-400 bg-gray-200">
        <div className="flex h-full overflow-hidden bg-gray-200">
          <img
            src={previews[0]}
            alt="preview"
            className="w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${forAddImage ? "h-auto lg:h-full" : ""} mx-auto aspect-square overflow-hidden rounded-md border border-gray-300`}
    >
      <Splide
        options={{
          perPage: 1,
          pagination: true,
          arrows: true,
          gap: "0",
        }}
      >
        {previews.map((src, index) => {
          const image = images[index];
          if (!image) return null;
          return (
            <SplideSlide key={index} className="h-full w-full overflow-hidden">
              <div className="flex h-full w-full overflow-hidden bg-gray-200">
                <img
                  src={src}
                  alt={`preview-${index}`}
                  className="w-full object-contain"
                />
                {!forAddImage &&
                  images[index].type === "existing" &&
                  images.length > 1 && (
                    <button
                      type="button"
                      className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-red-500 hover:text-gray-700"
                      aria-label="delete image"
                      onClick={() => handleDeleteImage(images[index], postId!)}
                    >
                      <TrashIcon size={18} />
                    </button>
                  )}
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default PostImagePreview;
