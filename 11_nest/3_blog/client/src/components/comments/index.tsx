import { useParams } from "react-router-dom";
import CommentForm from "./comment-form";
import CommentItem from "./comment-item";
import useComments from "../../hooks/useComments";
import Loader from "../loader";
import Error from "../error";

const Comments = () => {
  const { id: postId } = useParams();
  const { comments } = useComments();
  const { data, isLoading, error, refetch } = comments(postId as string);

  console.log(data);

  return (
    <div className="padding-x py-5">
      <CommentForm postId={postId as string} />

      <div className="mt-5">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error.message} refetch={refetch} />
        ) : (
          <div>selam</div>
        )}
      </div>
    </div>
  );
};

export default Comments;
