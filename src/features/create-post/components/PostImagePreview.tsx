import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import type { ImageItem } from "../CreatePost";
import { TrashIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { useDeleteImage } from "../hooks/useDeleteImage";
import { useQueryClient } from "@tanstack/react-query";

interface PostImagePreviewProps {
  images: ImageItem[];
  forAddImage?: boolean;
  postId?: string;
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

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
      <div className="h-full relative w-full flex items-center justify-center bg-gray-200 border border-gray-400 mx-auto rounded-md overflow-hidden">
        <img
          src={previews[0]}
          alt="preview"
          className="aspect-square object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`${forAddImage ? "lg:h-full h-auto" : ""} aspect-square border border-gray-300 mx-auto rounded-md overflow-hidden`}
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
            <SplideSlide key={index} className="overflow-hidden h-full w-full">
              <div className="flex h-full bg-gray-200 w-full overflow-hidden">
                <img
                  src={src}
                  alt={`preview-${index}`}
                  className="object-contain w-full"
                />
                {!forAddImage &&
                  images[index].type === "existing" &&
                  images.length > 1 && (
                    <div
                      className="absolute top-4 right-4"
                      onClick={() => handleDeleteImage(images[index], postId!)}
                    >
                      <TrashIcon />
                    </div>
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
