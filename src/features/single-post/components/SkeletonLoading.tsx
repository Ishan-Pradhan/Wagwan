function SkeletonLoading() {
  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-0 overflow-hidden p-0 pb-10 lg:mt-10 lg:grid-cols-2 lg:px-10 lg:pb-0">
      {/* image content */}
      <div className="h-[80vh] w-full flex-col justify-center overflow-hidden lg:flex">
        <div className="h-full w-full animate-pulse rounded-md bg-gray-500"></div>
      </div>

      {/* comment section */}
      <div className="flex flex-col justify-center gap-2 overflow-auto p-5">
        <div className="hidden items-center justify-between border-b border-gray-300 pb-4 lg:flex">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-500"></div>
            <div className="h-6 w-50 animate-pulse rounded-md bg-gray-500"></div>
          </div>
          <div className="h-1 w-10 animate-pulse rounded-md bg-gray-500"></div>
        </div>
        <div className="hidden gap-4 lg:flex">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-500"></div>
          <p className="flex items-center gap-2">
            <div className="h-6 w-10 animate-pulse rounded-md bg-gray-500"></div>
            <div className="h-6 w-40 animate-pulse rounded-md bg-gray-500"></div>
          </p>
        </div>

        <div className="relative flex h-full flex-col gap-8 overflow-y-auto py-4 md:h-100 xl:h-80">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-500"></div>
            <div className="h-6 w-50 animate-pulse rounded-md bg-gray-500"></div>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-4 border-t border-gray-300 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 animate-pulse rounded-md bg-gray-500"></div>
                <div className="h-4 w-8 animate-pulse rounded-md bg-gray-500"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 animate-pulse rounded-md bg-gray-500"></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="h-6 w-10 animate-pulse rounded-md bg-gray-500"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-full animate-pulse rounded-md bg-gray-500"></div>
            <div className="h-6 w-50 animate-pulse rounded-md bg-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
