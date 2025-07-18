import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";
import { useBlogs } from "../hooks/index";

const Blogs = () => {
  const { blogs, loading, page, setPage, totalBlogs } = useBlogs();

  interface Blog {
    id: string;
    author: {
      name: string;
    };
    title: string;
    content: string;
    createdAt: string;
  }

  const totalPages = Math.ceil(totalBlogs / 5); // assuming limit=5

  return loading ? (
    <div>Loading Blogs....</div>
  ) : (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Appbar />
      <div className="px-6 py-12 max-w-3xl mx-auto space-y-8">
        <div className="space-y-8">
          {blogs.map((item: Blog) => (
            <BlogCard
              key={item.id}
              authorName={item.author?.name || "Unknown"}
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
