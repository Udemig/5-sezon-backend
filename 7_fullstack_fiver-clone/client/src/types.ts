export interface ICategory {
  name: string;
  icon: JSX.Element;
}

export interface IInfo {
  title: string;
  text: string;
}

export interface IFormUser {
  username: string;
  email: string;
  photo: File;
  country: string;
  password: string;
  isSeller: boolean;
  phone?: string;
  desc?: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  photo: string;
  country: string;
  password: string;
  isSeller: boolean;
  createdAt: string;
  updatedDate: string;
  desc?: string;
  phone?: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IInput {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "number" | "file" | "textarea";
  min?: number;
  max?: number;
  placeholder?: string;
  multiple?: boolean;
}

export interface IGig {
  _id: string;
  user: {
    _id: string;
    username: string;
    photo: string;
  };
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  coverImage: string;
  images: string[];
  category: string;
  package_title: string;
  package_description: string;
  package_price: number;
  package_features: string[];
  package_duration: number;
  package_revisions: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGigDetail extends IGig {
  user: ISellerUser;
}

export interface ISellerUser {
  _id: string;
  username: string;
  email: string;
  country: string;
  photo: string;
  isSeller: true;
  createdAt: string;
  updatedAt: string;
  __v: number;
  phone: string;
  desc: string;
}
