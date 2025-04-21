import { FaTrash } from "react-icons/fa";
import useComments from "../../hooks/useComments";
import Error from "../error";
import Loader from "../loader";
import { useAuth } from "../../providers/auth-provider";

const CommentList = ({ postId }: { postId: string }) => {
  const { comments, deleteComment } = useComments();
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = comments(postId);

  return (
    <div className="mt-5">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} refetch={refetch} />
      ) : (
        <div className="flex flex-col">
          {data?.map((comment) => (
            <div key={comment._id} className="py-5 border-b border-dark-20">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <img
                    src={comment.author.profilePicture}
                    className="size-10 rounded-md"
                  />

                  <div>
                    <p className="font-semibold">{comment.author.username}</p>
                    <p className="text-sm text-zinc-500">
                      {new Date(comment.createdAt).toLocaleDateString("tr", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {comment.author._id === user?._id && (
                  <button
                    onClick={() => deleteComment.mutate(comment._id)}
                    className="bg-zinc-800 border border-zinc-700 rounded-md p-2 hover:bg-zinc-600 transition cursor-pointer"
                  >
                    <FaTrash className="size-4" />
                  </button>
                )}
              </div>

              <p className="mt-3">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
