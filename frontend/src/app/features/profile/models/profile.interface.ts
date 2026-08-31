export interface Profile {
  id: number;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
  created_at: string;
}
