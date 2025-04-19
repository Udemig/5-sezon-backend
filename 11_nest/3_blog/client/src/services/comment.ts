import api from "./axios";
import { Comment } from "../types";

const commentService = {
  create: async (postId: string, content: string): Promise<Comment> => {
    const response = await api.post<Comment>(`/post/${postId}/comments`, {
      content,
    });

    return response.data;
  },

  getAll: async (postId: string): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/post/${postId}/comments`);

    return response.data;
  },

  delete: async (commentId: string) => {
    const response = await api.delete(`/comments/${commentId}`);

    return response.data;
  },
};

export default commentService;
