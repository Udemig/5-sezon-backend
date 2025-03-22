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
  access: string;
  refresh: string;
}

interface RefreshResponse {
  access: string;
}

interface LogoutResponse {
  success: boolean;
}

export type {
  RegisterValues,
  LoginValues,
  UpdateProfileValues,
  User,
  LoginResponse,
  RefreshResponse,
  LogoutResponse,
};
