function StoriesSkeletonLoading() {
  return (
    <div className="flex w-full gap-3 px-5 lg:gap-5 lg:px-25">
      <div className="h-15 w-15 shrink-0 animate-pulse rounded-full bg-gray-500 lg:h-20 lg:w-20"></div>
      <div className="h-15 w-15 shrink-0 animate-pulse rounded-full bg-gray-500 lg:h-20 lg:w-20"></div>
      <div className="h-15 w-15 shrink-0 animate-pulse rounded-full bg-gray-500 lg:h-20 lg:w-20"></div>
      <div className="hidden: h-15 w-15 shrink-0 animate-pulse rounded-full bg-gray-500 lg:flex lg:h-20 lg:w-20"></div>
      <div className="hidden: h-15 w-15 shrink-0 animate-pulse rounded-full bg-gray-500 lg:flex lg:h-20 lg:w-20"></div>
      <div className="hidden: h-15 w-15 shrink-0 animate-pulse rounded-full bg-gray-500 lg:flex lg:h-20 lg:w-20"></div>
    </div>
  );
}

export default StoriesSkeletonLoading;
