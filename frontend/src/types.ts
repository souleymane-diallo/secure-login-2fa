export type Step = 1 | 2;

export interface User {
  id: number;
  email: string;
}

export interface AuthFormValue {
  email: string;
  password: string;
}

export interface TwoFactorFormValues {
  token: string;
}