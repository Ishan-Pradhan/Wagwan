function SkeletonLoading() {
  return (
    <div className="flex gap-4  w-full relative">
      <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse" />

      <div className="flex flex-col gap-2">
        {/* Username of the receiver */}
        <div className="w-15 h-5 bg-gray-600 animate-pulse rounded-full"></div>

        {/* Last message */}
        <p className="bg-gray-600 animate-pulse rounded-full w-20 h-4"></p>
      </div>
    </div>
  );
}

export default SkeletonLoading;
