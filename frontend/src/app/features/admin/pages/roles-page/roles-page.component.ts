import { Component, OnInit } from '@angular/core';
import {
  CreateRoleRequest,
  Role,
  UpdateRoleRequest,
} from '../../models/role.interface';
import { RolesService } from '../../services/roles.service';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss'],
})
export class RolesPageComponent implements OnInit {
  roles$ = this.rolesService.roles$;
  permissions$ = this.permisissionService.permissions$;

  roleSelected: Role | null = null;

  constructor(
    private rolesService: RolesService,
    private permisissionService: PermissionsService,
  ) {}

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe();
    this.permisissionService.getPermissions().subscribe();
  }

  onCreate(role: CreateRoleRequest): void {
    this.rolesService.createRole(role).subscribe({
      next: () => this.roleSelected = null,
      error: (error) => console.log(error),
    });
  }

  onUpdate(role: UpdateRoleRequest): void {
    this.rolesService.updateRole(role.id, role).subscribe({
      next: () => this.roleSelected = null,
      error: (error) => console.log(error),
    });
  }

  onDelete(roleId: number): void {
    if (roleId) {
      this.rolesService.deleteRole(roleId).subscribe();
    }
  }
}
