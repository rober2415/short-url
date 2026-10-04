export interface Profile {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface UpdateProfileRequest {
  name: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  password: string;
}