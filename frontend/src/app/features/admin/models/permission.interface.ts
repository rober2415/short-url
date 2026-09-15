export interface Permission {
  id: number;
  name: string;
}

export interface CreatePermissionRequest {
  name: string;
}

export interface UpdatePermissionRequest {
  id: number;
  name: string;
}
