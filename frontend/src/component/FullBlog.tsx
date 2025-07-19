import { Appbar } from "./Appbar";
import type { BlogType } from "../hooks";
import { Avatar } from "./BlogCard";

type FullBlogProps = {
  blog: BlogType;
};

export const FullBlog = ({ blog }: FullBlogProps) => {
  const authorName = blog.author?.name || "Anonymous";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Appbar />
      <div className="grid grid-cols-1 md:grid-cols-12 px-6 py-12 max-w-6xl mx-auto gap-8">

        <div className="md:col-span-8 space-y-6">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <p className="text-gray-400">
            Posted on 19 July 2025
          </p>
          <p className="text-lg leading-relaxed whitespace-pre-line text-gray-100">
            {blog.content}
          </p>
        </div>

        <div className="md:col-span-4 space-y-2 mt-10 md:mt-0">
          <h2 className="text-sm text-gray-400">Author</h2>

          <Avatar name={authorName} />

          <p className="text-gray-400">
            Master of mirth, purveyor of puns, and the funniest person in the kingdom.
          </p>
        </div>
      </div>
    </div>
  );
};
