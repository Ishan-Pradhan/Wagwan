function FeedSkeletonLoading() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2 p-3 sm:max-w-lg md:max-w-md">
      <div className="flex items-center justify-between px-4">
        {/* user info and created time */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 animate-pulse cursor-pointer rounded-full bg-gray-400 dark:bg-gray-600"></div>
          <div className="body-m-semibold h-5 w-30 animate-pulse cursor-pointer rounded-md bg-gray-400 dark:bg-gray-600"></div>

          <div className="h-5 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
        </div>

        {/* menu */}
        <div className="h-1 w-4 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
      </div>

      {/* post */}
      <div className="flex flex-col gap-3">
        <div className="h-96 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
              <div className="h-5 w-5 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
              <div className="h-5 w-5 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
            </div>
            <div className="h-5 w-5 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
          </div>
          <span className="h-3 w-7 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></span>
        </div>
      </div>

      {/* post description */}
      <div className="flex flex-col">
        <div className="h-5 w-full animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
        <div className="h-5 w-1/2 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
      </div>

      {/* comments */}
      <div className="flex flex-col justify-start gap-3">
        <div className="h-5 w-1/3 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
        <div className="flex w-full justify-between">
          <div className="h-5 w-full animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
          {/* <div className="bg-gray-400 dark:bg-gray-600 animate-pulse h-5 rounded-md w-6"></div> */}
        </div>
      </div>
    </div>
  );
}

export default FeedSkeletonLoading;
