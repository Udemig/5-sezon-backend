import { Blog, CreateBlogValues, GetAllParams, GetAllResponse } from "../types";
import api from "./axios";

const blogService = {
  getAll: async (params?: GetAllParams) => {
    const response = await api.get<GetAllResponse>("/posts", { params });

    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Blog>(`/posts/${id}`);

    return response.data;
  },

  getOwn: async (params?: GetAllParams) => {
    const response = await api.get<GetAllResponse>("/posts/own", { params });

    return response.data;
  },

  create: async (values: CreateBlogValues) => {
    const response = await api.post<Blog>("/posts", values);

    return response.data;
  },

  update: async (id: string, values: Partial<CreateBlogValues>) => {
    const response = await api.patch<Blog>(`/posts/${id}`, values);

    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<Blog>(`/posts/${id}`);

    return response.data;
  },
};

export default blogService;
