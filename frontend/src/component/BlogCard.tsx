import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-gray-700 pb-6 hover:bg-gray-800/50 p-2 rounded-md transition">
        <div className="flex-1">
          <Avatar name={authorName} />
          <div className="text-sm text-gray-400 mb-1">{publishedDate}</div>
          <h2 className="text-xl font-semibold text-white hover:underline cursor-pointer">
            {title}
          </h2>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{content.slice(0,150)}</p>
          <div className="text-sm text-gray-500 mt-2">2 min read</div>
        </div>

        <div className="w-24 h-24 bg-gray-900 rounded-md flex items-center justify-center text-gray-600 text-xs">
          IMG
        </div>
      </div>
    </Link>
  );
};

interface AvatarProps {
  name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
  return (
    <div className="flex items-center gap-3 mb-2 mr-4">
      <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-semibold text-sm">
        {name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()}
      </div>
      <span className="text-sm text-gray-300">{name}</span>
    </div>
  );
};
