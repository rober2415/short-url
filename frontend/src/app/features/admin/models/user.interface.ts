import { Role } from './role.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface UpdateUserRequest {
  id: number;
  name: string;
  email: string;
  password?: string;
  roles?: string[];
}
