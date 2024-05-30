export type Step = 1 | 2;

export interface IUser {
  id: number;
  email: string;
}

export interface IAuthFormValues {
  email: string;
  password: string;
}

export interface ITwoFactorFormValues {
  token: string;
}