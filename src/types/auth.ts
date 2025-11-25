
export type User = {
  name: string;
  email: string;
  avatar?: string | null;
};

export type AuthFormData = {
  email: string;
  password: string;
  name?: string; // used in signup
};
