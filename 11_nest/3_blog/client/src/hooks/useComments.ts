import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import commentService from "../services/comment";
import { toast } from "react-toastify";

const useComments = () => {
  const queryClient = useQueryClient();

  const comments = (postId: string) =>
    useQuery({
      queryKey: ["comments", postId],
      queryFn: () => commentService.getAll(postId),
      enabled: !!postId,
    });

  const create = useMutation({
    mutationKey: ["createComment"],
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      commentService.create(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteComment = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: (commentId: string) => commentService.delete(commentId),
    onSuccess: () => {
      toast.success("Yorum başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { comments, create, deleteComment };
};

export default useComments;
