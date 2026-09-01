export interface AuthUser {
  name?: string;
  email: string;
  password: string;
}
export interface CurrentUser {
  id: number;
  name: string;
  roles: string[];
}
