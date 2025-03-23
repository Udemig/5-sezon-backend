import { FC } from "react";
import { Blog } from "../../types";

interface Props {
  post: Blog;
}

const Post: FC<Props> = ({ post }) => {
  return (
    <div className="flex flex-col gap-5 p-5 border-b border-dark-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-sm text-gray-500">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
