function FeedSkeletonLoading() {
  return (
    <div className="w-full flex flex-col gap-2 p-3  max-w-md sm:max-w-lg md:max-w-md  mx-auto">
      <div className="flex justify-between px-4 items-center">
        {/* user info and created time */}
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-500 animate-pulse"></div>
          <div className="body-m-semibold cursor-pointer bg-gray-500 animate-pulse h-5 rounded-md"></div>

          <div className="bg-gray-500 animate-pulse h-5 rounded-md"></div>
        </div>

        {/* menu */}
        <div className="bg-gray-500 animate-pulse h-1 w-4"></div>
      </div>

      {/* post */}
      <div className="flex flex-col gap-3 ">
        <div className="bg-gray-500 animate-pulse h-96"></div>
        <div className="flex flex-col  gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="bg-gray-500 animate-pulse h-5 rounded-md w-5"></div>
              <div className="bg-gray-500 animate-pulse h-5 rounded-md w-5"></div>
              <div className="bg-gray-500 animate-pulse h-5 rounded-md w-5"></div>
            </div>
            <div className="bg-gray-500 animate-pulse h-5 rounded-md w-5"></div>
          </div>
          <span className=" bg-gray-500 animate-pulse h-3 w-7 "></span>
        </div>
      </div>

      {/* post description */}
      <div className="flex flex-col">
        <div className="bg-gray-500 animate-pulse h-5 rounded-md w-full"></div>
        <div className="bg-gray-500 animate-pulse h-5 rounded-md w-1/2"></div>
      </div>

      {/* comments */}
      <div className="flex flex-col gap-3 justify-start">
        <div className="bg-gray-500 animate-pulse h-5 rounded-md w-1/3"></div>
        <div className="flex w-full justify-between">
          <div className="w-full bg-gray-500 animate-pulse h-5 rounded-md"></div>
          <div className="bg-gray-500 animate-pulse h-5 rounded-md w-6"></div>
        </div>
      </div>
    </div>
  );
}

export default FeedSkeletonLoading;
