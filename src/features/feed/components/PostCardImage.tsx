import { getImageSrc } from "utils/getImageSrc";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

type Image = {
  _id: string;
  url: string;
  localPath: string;
};

type ImagesProps = {
  images: Image[];
};

function PostCardImage({ images }: ImagesProps) {
  if (!images.length) return null;

  if (images.length === 1) {
    return <img src={getImageSrc(images[0])} alt="" loading="lazy" />;
  }

  return (
    <div className="w-full h-full flex items-center  mx-auto rounded-md overflow-hidden  ">
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
              className="h-full w-full relative rounded-l-md"
            >
              <div className="bg-white flex justify-center items-center h-full w-full rounded-l-md">
                <img
                  src={getImageSrc(img)}
                  alt="users posts"
                  className=" object-cover   h-full w-full"
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
