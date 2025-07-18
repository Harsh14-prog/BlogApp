import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700 bg-[#0f172a]">
      <div className="text-2xl font-bold tracking-wide">
        Blog<span className="text-sky-600">Verse</span>
      </div>

      <div>
        <Avatar name="Harshad Khambe" />
      </div>
    </div>
  );
};
