import { getImageSrc } from "utils/getImageSrc";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import type { ImagesProps } from "../types/PostCardImageTypes";

function PostCardImage({ images }: ImagesProps) {
  if (!images.length) return null;

  if (images.length === 1) {
    return (
      <div className="w-full h-full  flex items-center justify-center dark:bg-gray-700 bg-primary-50 border border-gray-300 dark:border-gray-600   mx-auto rounded-md overflow-hidden">
        <img
          className="h-full w-full  object-cover"
          src={getImageSrc(images[0])}
          alt="user post"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full border border-gray-300 dark:border-gray-600  mx-auto rounded-md overflow-hidden">
      <Splide
        options={{
          perPage: 1,
          pagination: true,
          arrows: true,
          gap: "0",
          lazyLoad: "nearby",
        }}
      >
        {images.map((img) => {
          return (
            <SplideSlide
              key={img._id}
              className="overflow-hidden h-full  w-full rounded-l-md"
            >
              <div className="flex h-full bg-primary-50    w-full rounded-l-md overflow-hidden">
                <img
                  src={getImageSrc(img)}
                  alt="users posts"
                  className=" object-cover  overflow-hidden w-full "
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
