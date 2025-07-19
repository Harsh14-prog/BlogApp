import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Appbar } from "./Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); 

  const handleEvenet = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, { title, content }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert("Blog created successfully!");
      navigate(`/blog/${res.data.id}`);
    } catch (err) {
      alert("Error publishing blog");
      console.error(err);
    }
  };
 
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Appbar />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <h1 className="text-3xl font-bold">Create a New Blog</h1>

        <div>
          <label className="block mb-1 text-gray-300 text-sm">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-300 text-sm">Content</label>
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>

        <button
          onClick={handleEvenet}
          className="bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded font-semibold text-white transition duration-200"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Publish;
