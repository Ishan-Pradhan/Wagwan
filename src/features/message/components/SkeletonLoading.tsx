function SkeletonLoading() {
  return (
    <div className="relative flex w-full gap-4">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600" />

      <div className="flex flex-col gap-2">
        {/* Username of the receiver */}
        <div className="h-5 w-15 animate-pulse rounded-full bg-gray-600"></div>

        {/* Last message */}
        <p className="h-4 w-20 animate-pulse rounded-full bg-gray-600"></p>
      </div>
    </div>
  );
}

export default SkeletonLoading;
