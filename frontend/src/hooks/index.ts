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
      const token = localStorage.getItem("token"); // assuming you're storing token here
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
