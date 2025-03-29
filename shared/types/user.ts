export type ID = string;

export interface User {
  id?: ID;
  password: string;
  repeatPassword?: string;
  email: string;
  name?: string | null;
  profileImage?: string | null;
}

export interface UserLogin {
  email: string;
  password: string;
}
