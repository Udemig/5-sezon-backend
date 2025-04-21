import { useParams } from "react-router-dom";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";

const Comments = () => {
  const { id: postId } = useParams();

  return (
    <div className="padding-x py-5 pb-10">
      <CommentForm postId={postId as string} />

      <CommentList postId={postId as string} />
    </div>
  );
};

export default Comments;
