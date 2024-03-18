export interface IUserDTO {
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPadDTO {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPad {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type Scalar = string | number | boolean | null;
