import { Appbar } from "./Appbar";

const BlogSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Appbar />

      <div className="grid grid-cols-1 md:grid-cols-12 px-6 py-12 max-w-6xl mx-auto gap-8 animate-pulse">
        {/* Left Blog Content Skeleton */}
        <div className="md:col-span-8 space-y-6">
          <div className="h-10 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-600 rounded w-1/3" />
          <div className="h-[1px] bg-gray-700" />

          <div className="space-y-3">
            <div className="h-4 bg-gray-600 rounded w-full" />
            <div className="h-4 bg-gray-600 rounded w-11/12" />
            <div className="h-4 bg-gray-600 rounded w-10/12" />
            <div className="h-4 bg-gray-600 rounded w-full" />
            <div className="h-4 bg-gray-600 rounded w-9/12" />
            <div className="h-4 bg-gray-600 rounded w-full" />
          </div>
        </div>

        {/* Right Author Section Skeleton */}
        <div className="md:col-span-4 space-y-4 mt-10 md:mt-0">
          <div className="h-4 bg-gray-600 rounded w-1/4" />
          <div className="h-10 w-10 bg-gray-700 rounded-full" />
          <div className="h-4 bg-gray-600 rounded w-2/3" />
          <div className="h-4 bg-gray-600 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
