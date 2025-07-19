export const BlogCardSkeleton = () => {
  return (
    <div className="flex justify-between items-start gap-4 border-b border-gray-700 pb-6 animate-pulse">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-gray-700"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>

        <div className="h-3 w-32 bg-gray-700 rounded mb-2"></div>

        <div className="h-5 w-3/4 bg-gray-600 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-700 rounded mb-2"></div>
        <div className="h-3 w-20 bg-gray-600 rounded"></div>
      </div>

      <div className="w-24 h-24 bg-gray-800 rounded-md flex-shrink-0"></div>
    </div>
  );
};
