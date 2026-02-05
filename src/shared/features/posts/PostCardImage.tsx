import { getImageSrc } from "utils/getImageSrc";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import type { ImagesProps } from "./types/PostCardImageTypes";

function PostCardImage({ images }: ImagesProps) {
  if (!images.length) return null;

  if (images.length === 1) {
    return (
      <div className="bg-primary-50 mx-auto flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700">
        <img
          className="h-full w-full object-cover"
          src={getImageSrc(images[0])}
          alt="user's post"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto h-full w-full overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
      <Splide
        options={{
          perPage: 1,
          pagination: true,
          arrows: true,
          gap: "0",
          lazyLoad: "nearby",
          breakpoint: {
            500: {
              arrows: false,
            },
          },
        }}
      >
        {images.map((img, index) => {
          return (
            <SplideSlide
              key={img._id}
              className="relative h-full w-full overflow-hidden rounded-l-md"
            >
              <div className="caption-regular absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-400/80 text-white dark:bg-gray-700/50">
                {index + 1}/{images.length}
              </div>
              <div className="bg-primary-50 flex h-full w-full overflow-hidden rounded-l-md">
                <img
                  src={getImageSrc(img)}
                  alt="users posts"
                  className="w-full overflow-hidden object-cover"
                  loading="lazy"
                />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default PostCardImage;
