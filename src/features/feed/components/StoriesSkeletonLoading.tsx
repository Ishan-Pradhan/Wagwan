function StoriesSkeletonLoading() {
  return (
    <div className="flex w-full gap-3 px-5 lg:gap-5 lg:px-25">
      <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-400 dark:bg-gray-600"></div>
      <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-400 dark:bg-gray-600"></div>
      <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-400 dark:bg-gray-600"></div>
      <div className="hidden h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-400 xl:flex dark:bg-gray-600"></div>
      <div className="hidden h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-400 xl:flex dark:bg-gray-600"></div>
      <div className="hidden h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-400 xl:flex dark:bg-gray-600"></div>
    </div>
  );
}

export default StoriesSkeletonLoading;
