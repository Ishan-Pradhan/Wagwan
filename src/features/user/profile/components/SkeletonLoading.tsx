function SkeletonLoading() {
  return (
    <div className="container flex max-w-4xl flex-col justify-center gap-4 px-4 py-3 pb-20 lg:py-10">
      <div className="mx-auto">
        <div className="flex w-full items-center gap-10 lg:justify-between">
          {/* image */}
          <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-400 lg:h-30 lg:w-30 dark:bg-gray-600"></div>

          {/* user details */}
          <div className="flex flex-1 flex-col gap-2 lg:gap-5">
            {/* user info and interactions */}
            <div className="flex items-center gap-5">
              <div className="h-4 w-20 animate-pulse rounded-full bg-gray-400 dark:bg-gray-600"></div>
              <div className="hidden h-6 w-20 animate-pulse rounded-md bg-gray-400 lg:flex dark:bg-gray-600"></div>
            </div>

            {/* responsive follow button */}
            <div className="flex h-6 w-20 animate-pulse self-start rounded-md bg-gray-400 lg:hidden dark:bg-gray-600"></div>

            {/* followers, posts and following counts */}
            <div className="flex items-center gap-5 lg:gap-10">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
                <div className="h-4 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
                <div className="h-4 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
                <div className="h-4 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* user's full name  */}
              <div className="body-s-bold hidden gap-4 lg:flex">
                <div className="h-4 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
                <div className="h-4 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
              </div>

              {/* user's bio */}
              <div className="hidden h-6 w-50 animate-pulse rounded-md bg-gray-400 lg:flex dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* user's full name  */}
          <div className="body-s-bold flex gap-4 lg:hidden">
            <div className="h-4 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
            <div className="h-4 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
          </div>
          <div className="h-6 w-50 animate-pulse rounded-md bg-gray-400 lg:hidden dark:bg-gray-600"></div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex w-full items-center justify-center">
          <div className="h-10 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="h-10 w-10 animate-pulse rounded-md bg-gray-400 dark:bg-gray-600"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            {" "}
            <div className="relative aspect-square">
              <div className="aspect-square animate-pulse bg-gray-400 object-cover dark:bg-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoading;
