export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
};

export type AuthFormData = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
};