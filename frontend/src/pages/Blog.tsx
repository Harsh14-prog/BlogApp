import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../component/FullBlog";
import BlogSkeleton from "../component/BlogSkeleton";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  if (loading) return (<BlogSkeleton/>);
  if (!blog) return <div className="text-red-500">Blog not found</div>;

  return (
    <div className="w-full h-screen">
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
