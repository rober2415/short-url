import { Permission } from "./permission.interface";

export interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
}

export interface CreateRoleRequest {
  name: string;
  permissions?: string[];
}

export interface UpdateRoleRequest {
  id: number;
  name: string;
  permissions?: string[];
}
