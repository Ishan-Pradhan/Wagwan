import { useGetPosts } from "features/user/profile/hooks/useGetPosts";
import { Link, useParams } from "react-router";
import { Splide } from "@splidejs/react-splide";
import { SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import LottieLoading from "@components/ui/LottieLoading";
import { PlayIcon, PauseIcon, XIcon } from "@phosphor-icons/react";
import { useGetProfile } from "features/user/profile/hooks/useGetProfile";

function StoryPage() {
  const { username } = useParams();
  const { data, isLoading } = useGetPosts(username);
  const { data: profile } = useGetProfile(username);

  if (isLoading) return <LottieLoading />;

  const firstPost = data?.pages?.[0]?.posts?.[0];
  if (!firstPost)
    return (
      <div className="bg-gray-800 h-lvh w-full text-white flex items-center justify-center relative">
        <span>User doesn't have story</span>
        <Link
          to="/"
          className="text-white absolute lg:top-10 lg:right-10 right-5 top-5 text-3xl"
        >
          <XIcon />
        </Link>
      </div>
    );

  return (
    <div className="bg-gray-800 h-lvh flex justify-center items-center relative">
      <div className="h-[80vh] w-sm mx-auto flex flex-col ">
        <Splide
          hasTrack={false}
          aria-label="Story"
          options={{
            type: "loop",
            perPage: 1,
            gap: "",
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            resetProgress: false,
          }}
        >
          <div className="flex gap-2 items-center mb-8">
            <img
              src={profile?.account.avatar.url}
              alt="user avatar"
              className="w-10 h-10 rounded-full border border-gray-100"
            />
            <span className="body-l-semibold text-white">{username}</span>
          </div>
          <SplideTrack className="h-full w-full flex flex-col bg-black mx-auto">
            {firstPost.images.map((image, index) => (
              <SplideSlide key={index} className="w-full h-full">
                <img
                  src={image.url}
                  alt="user story"
                  className="h-full w-full object-cover object-center"
                />
              </SplideSlide>
            ))}
          </SplideTrack>
          <div className="splide__progress">
            <div className="splide__progress__bar" />
          </div>

          <button className="splide__toggle absolute top-22 right-4">
            <span className="splide__toggle__play">
              <PlayIcon size={24} fill="white" weight="fill" />
            </span>
            <span className="splide__toggle__pause">
              <PauseIcon size={24} fill="white" weight="fill" />
            </span>
          </button>
        </Splide>
      </div>
      <Link
        to="/"
        className="text-white absolute lg:top-10 lg:right-10 right-5 top-5 text-3xl"
      >
        <XIcon />
      </Link>
    </div>
  );
}

export default StoryPage;
