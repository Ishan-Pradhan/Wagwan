function SkeletonLoading() {
  return (
    <div className="container max-w-4xl flex flex-col gap-4 justify-center lg:py-10 py-3 pb-20 px-4">
      <div className="mx-auto ">
        <div className="flex lg:justify-between  gap-10  items-center  w-full">
          {/* image */}
          <div className="lg:h-30 lg:w-30 w-20 h-20 shrink-0 rounded-full  bg-gray-500 animate-pulse"></div>

          {/* user details */}
          <div className="flex flex-1  flex-col lg:gap-5 gap-2">
            {/* user info and interactions */}
            <div className="flex gap-5 items-center ">
              <div className="w-20 h-4 bg-gray-500 animate-pulse rounded-full"></div>
              <div className="hidden lg:flex bg-gray-500 w-20 h-6 animate-pulse rounded-md"></div>
            </div>

            {/* responsive follow button */}
            <div className="lg:hidden flex self-start bg-gray-500 w-20 h-6 animate-pulse rounded-md"></div>

            {/* followers, posts and following counts */}
            <div className="flex lg:gap-10 gap-5 items-center">
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-gray-500 animate-pulse rounded-md"></div>
                <div className="bg-gray-500 animate-pulse rounded-md h-4 w-10"></div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-gray-500 animate-pulse rounded-md"></div>
                <div className="bg-gray-500 animate-pulse rounded-md h-4 w-10"></div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-gray-500 animate-pulse rounded-md"></div>
                <div className="bg-gray-500 animate-pulse rounded-md h-4 w-10"></div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* user's full name  */}
              <div className="lg:flex gap-4 hidden body-s-bold">
                <div className="bg-gray-500 animate-pulse rounded-md h-4 w-10"></div>
                <div className="bg-gray-500 animate-pulse rounded-md h-4 w-10"></div>
              </div>

              {/* user's bio */}
              <p className="bg-gray-500 animate-pulse rounded-md h-6 w-50 hidden lg:flex"></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          {/* user's full name  */}
          <div className="lg:hidden gap-4 flex body-s-bold">
            <div className="bg-gray-500 animate-pulse rounded-md h-4 w-10"></div>
            <div className="bg-gray-500 animate-pulse rounded-md h-4 w-10"></div>
          </div>
          <p className="bg-gray-500 animate-pulse rounded-md h-6 w-50 lg:hidden"></p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="w-full flex justify-center items-center">
          <div className="bg-gray-500 animate-pulse rounded-md h-10 w-10"></div>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="bg-gray-500 animate-pulse rounded-md h-10 w-10"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            {" "}
            <div className="aspect-square relative ">
              <div className="aspect-square object-cover bg-gray-500 animate-pulse " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoading;
