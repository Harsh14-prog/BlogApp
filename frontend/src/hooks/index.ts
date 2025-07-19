import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(1);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blog/bulk?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(res.data.posts);
      setTotalBlogs(res.data.totalPosts);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  return { blogs, loading, page, setPage, totalBlogs };
};

export type BlogType = {
  id: string;
  title: string;
  content: string;
  author?: {
    name: string;
  };
  createdAt?: string;
};

export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlog(res.data.post);
      } catch (err: any) {
        setError("Failed to fetch blog");
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  return { blog, loading, error };
};
