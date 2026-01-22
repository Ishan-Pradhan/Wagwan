import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import type { ImageItem } from "../CreatePost";

interface PostImagePreviewProps {
  images: ImageItem[];
  forAddImage?: boolean;
}

function PostImagePreview({
  images,
  forAddImage = true,
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

  if (!images.length || !previews.length) return null;

  if (images.length === 1) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-200 border border-gray-400 mx-auto rounded-md overflow-hidden">
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
        {previews.map((src, index) => (
          <SplideSlide key={index} className="overflow-hidden h-full w-full">
            <div className="flex h-full bg-gray-200 w-full overflow-hidden">
              <img
                src={src}
                alt={`preview-${index}`}
                className="object-contain w-full"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default PostImagePreview;
