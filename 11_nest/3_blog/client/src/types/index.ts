interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

interface LoginValues {
  username: string;
  password: string;
}

interface UpdateProfileValues {
  username: string;
  email: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  user: User;
}

interface RefreshResponse {
  access: string;
}

interface LogoutResponse {
  success: boolean;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface GetAllParams {
  page: number;
  limit: number;
}

interface GetAllResponse {
  posts: Blog[];
  total: number;
  totalPages: number;
}

interface CreateBlogValues {
  title: string;
  content: string;
  tags: string[];
}

export type {
  RegisterValues,
  LoginValues,
  UpdateProfileValues,
  User,
  LoginResponse,
  RefreshResponse,
  LogoutResponse,
  GetAllParams,
  Blog,
  GetAllResponse,
  CreateBlogValues,
};
