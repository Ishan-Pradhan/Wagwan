function SkeletonLoading() {
  return (
    <div
      className="
          justify-center items-center
       w-full
       grid grid-cols-1 lg:grid-cols-2 gap-0
       p-0 
       overflow-hidden
       lg:mt-10 lg:px-10 pb-10 lg:pb-0
     "
    >
      {/* image content */}
      <div className=" lg:flex w-full h-[80vh]  justify-center  flex-col overflow-hidden ">
        <div className="h-full w-full rounded-md bg-gray-500 animate-pulse "></div>
      </div>

      {/* comment section */}
      <div className="flex flex-col gap-2 overflow-auto p-5 justify-center">
        <div className="justify-between items-center pb-4 border-b border-gray-300 lg:flex hidden">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-500 animate-pulse "></div>
            <div className="bg-gray-500 animate-pulse rounded-md h-6 w-50"></div>
          </div>
          <div className="w-10 h-1 bg-gray-500 animate-pulse rounded-md "></div>
        </div>
        <div className="lg:flex gap-4 hidden">
          <div className="w-10 h-10 rounded-full bg-gray-500 animate-pulse "></div>
          <p className="flex gap-2 items-center">
            <div className="bg-gray-500 animate-pulse rounded-md h-6 w-10"></div>
            <div className="bg-gray-500 animate-pulse rounded-md h-6 w-40"></div>
          </p>
        </div>

        <div className="flex flex-col gap-8 xl:h-80 md:h-100 h-full overflow-y-auto py-4 relative">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-500 animate-pulse "></div>
            <div className="bg-gray-500 animate-pulse rounded-md h-6 w-50"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t py-2 border-gray-300 mt-auto">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <div className="flex gap-3 items-center">
                <div className="bg-gray-500 animate-pulse rounded-md h-8 w-8"></div>
                <div className="bg-gray-500 animate-pulse rounded-md h-4 w-8"></div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-gray-500 animate-pulse rounded-md h-8 w-8"></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="bg-gray-500 animate-pulse rounded-md h-6 w-10"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full bg-gray-500 animate-pulse rounded-md h-6"></div>
            <div className="bg-gray-500 animate-pulse rounded-md h-6 w-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
