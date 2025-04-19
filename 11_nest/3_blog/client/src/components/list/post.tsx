import { FC } from "react";
import { Blog } from "../../types";
import {
  FaArrowRight,
  FaComment,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaShare,
} from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
  post: Blog;
}

const Post: FC<Props> = ({ post }) => {
  return (
    <Link
      to={`/blog/${post._id}`}
      className="flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] gap-5 py-5 padding-x border-b border-dark-20"
    >
      <div className="flex gap-3">
        <img
          src={post.author.profilePicture}
          alt={post.author.username}
          className="w-10 h-10 rounded-full"
        />

        <div>
          <h5 className="font-semibold">{post.author.username}</h5>
          <span className="text-sm text-gray-400">{post.author.email}</span>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-400">
            {new Date(post.createdAt).toLocaleDateString("tr", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-sm text-gray-400">
            {post.content.length > 100
              ? post.content.slice(0, 100) + "..."
              : post.content}
          </p>
        </div>

        <div className="flex gap-5 mt-5">
          <button className="border border-zinc-700 bg-zinc-800 p-1 w-[70px] flex items-center justify-center gap-2 rounded-full cursor-pointer hover:bg-zinc-900 text-gray-300">
            <FaRegHeart />
            <span className="text-sm">32k</span>
          </button>

          <button className="border border-zinc-700 bg-zinc-800 p-1 w-[70px] flex items-center justify-center gap-2 rounded-full cursor-pointer hover:bg-zinc-900 text-gray-300">
            <FaRegComment />
            <span className="text-sm">16k</span>
          </button>

          <button className="border border-zinc-700 bg-zinc-800 p-1 w-[70px] flex items-center justify-center gap-2 rounded-full cursor-pointer hover:bg-zinc-900 text-gray-300">
            <FaRegShareFromSquare />
            <span className="text-sm">4.2k</span>
          </button>
        </div>
      </div>

      <div className="flex items-center max-md:hidden">
        <button className="border border-zinc-700 rounded-lg py-2 px-4 flex items-center gap-2 cursor-pointer hover:bg-zinc-800">
          <span className="text-gray-400">Blog'a Git</span>
          <FaArrowRight className="text-yellow-55" />
        </button>
      </div>
    </Link>
  );
};

export default Post;
