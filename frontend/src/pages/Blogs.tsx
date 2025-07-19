import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";
import { useBlogs } from "../hooks/index";
import {BlogCardSkeleton} from "../component/BlogCardSkeleton";

const Blogs = () => {
  const { blogs, loading, page, setPage, totalBlogs } = useBlogs();

  interface Blog {
    id: number;
    author: {
      name: string;
    };
    title: string;
    content: string;
    createdAt: string;
  }

  const totalPages = Math.ceil(totalBlogs / 5);

  return loading ? (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Appbar />
      <div className="px-6 py-12 max-w-3xl mx-auto space-y-8">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Appbar />
      <div className="px-6 py-12 max-w-3xl mx-auto space-y-8">
        <div className="space-y-8">
          {blogs.map((item: Blog) => (
            <BlogCard
              key={item.id}
              id={item.id}
              authorName={item.author?.name || "Anonymous"}
              title={item.title}
              content={item.content}
              publishedDate={new Date(item.createdAt).toDateString()}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center pt-8">
          <button
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
