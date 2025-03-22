import {
  LoginValues,
  RegisterValues,
  UpdateProfileValues,
  User,
  LoginResponse,
  RefreshResponse,
  LogoutResponse,
} from "../types";
import api from "./axios";

export const authService = {
  login: async (values: LoginValues) => {
    const response = await api.post<LoginResponse>("/auth/login", values);
    return response.data;
  },

  register: async (values: RegisterValues) => {
    const response = await api.post<User>("/auth/register", values);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get<User>("/user/me");
    return response.data;
  },

  updateProfile: async (values: UpdateProfileValues) => {
    const response = await api.patch<User>("/user/me", values);
    return response.data;
  },

  refresh: async () => {
    const response = await api.post<RefreshResponse>("/auth/refresh");
    return response.data;
  },

  logout: async () => {
    const response = await api.post<LogoutResponse>("/auth/logout");
    return response.data;
  },
};
