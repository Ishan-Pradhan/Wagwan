import { useGetPosts } from "shared/features/user-profile/hooks/useGetPosts";
import { Link, useParams } from "react-router";
import { Splide } from "@splidejs/react-splide";
import { SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import LottieLoading from "@components/custom-ui/LottieLoading";
import { PlayIcon, PauseIcon, XIcon } from "@phosphor-icons/react";
import { useGetProfile } from "shared/features/user-profile/hooks/useGetProfile";

function StoryPage() {
  const { username } = useParams();
  const { data, isLoading } = useGetPosts(username);
  const { data: profile } = useGetProfile(username);

  if (isLoading)
    return (
      <div className="h-[80vh]">
        <LottieLoading />;
      </div>
    );

  const firstPost = data?.pages?.[0]?.posts?.[0];
  if (!firstPost)
    return (
      <div className="relative flex h-[80vh] w-full items-center justify-center bg-gray-800 text-white lg:h-lvh">
        <span>User doesn't have story</span>
        <Link
          to="/"
          className="absolute top-5 right-5 text-3xl text-white lg:top-10 lg:right-10"
        >
          <XIcon />
        </Link>
      </div>
    );

  return (
    <div className="relative flex h-[80vh] items-center justify-center bg-gray-800 py-3 lg:h-lvh">
      <div className="mx-auto flex h-[70vh] w-sm flex-col">
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
          <Link
            to={`/user/profile/${username}`}
            className="mb-8 flex items-center gap-2"
          >
            <img
              src={profile?.account.avatar.url}
              alt={`${profile?.account.username}'s avatar`}
              className="h-10 w-10 rounded-full border border-gray-100 object-cover"
            />
            <span className="body-l-semibold text-white">{username}</span>
          </Link>
          <SplideTrack className="mx-auto flex h-full w-full flex-col bg-black">
            {firstPost.images.map((image, index) => (
              <SplideSlide key={index} className="h-full w-full">
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

          <button
            aria-label="play/pause button"
            className="splide__toggle absolute top-22 right-4"
          >
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
        aria-label="close button"
        className="absolute top-5 right-5 text-3xl text-white lg:top-10 lg:right-10"
      >
        <XIcon />
      </Link>
    </div>
  );
}

export default StoryPage;
