import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

interface PostImagePreviewProps {
  images: File[];
}

function PostImagePreview({ images }: PostImagePreviewProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    // Create blob URLs when images change
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    // Cleanup function to revoke URLs when component unmounts or images change
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  if (!images.length || !previews.length) return null;

  if (images.length === 1) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 border border-gray-400 mx-auto rounded-md overflow-hidden">
        <img
          src={previews[0]}
          alt="preview"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full border border-gray-300 mx-auto rounded-md overflow-hidden">
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
