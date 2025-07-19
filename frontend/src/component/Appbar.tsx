import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700 bg-[#0f172a]">
      <div className="text-2xl font-bold tracking-wide">
        <Link to={"/blogs"}>
          Blog<span className="text-sky-600">Verse</span>
        </Link>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Link to="/create">
          <button className="mr-4 px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full shadow-md transition duration-200">
            + New Post
          </button>
        </Link>
        <Avatar name="Harshad Khambe" />
      </div>
    </div>
  );
};
