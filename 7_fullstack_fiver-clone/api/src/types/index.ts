export type ExtendedFiles = {
  coverImage: { path: string }[];
  images: { path: string }[];
};

export type Query = {
  category?: string;
  search?: string;
  userID?: string;
  min?: string;
  max?: string;
};

export type Filters = {
  user?: string;
  category?: string;
  package_price?: {
    $gte?: string;
    $lte?: string;
  };
  title?: {
    $regex: string;
    $options: string;
  };
};
