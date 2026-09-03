import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role.interface';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss'],
})
export class RolesPageComponent implements OnInit {
  roles: Role[] = [];
  selectedRole: Role | null = null;
  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {}

  selectRole(role: Role): void {
    this.selectedRole = { ...role };
  }

  updateRole(role: Role): void {
    this.rolesService.updateRole(role.id, role).subscribe({
      next: () => {
        this.selectedRole = null;
      },
      error: (err) => {
        console.error('Error updating role:', err);
      },
    });
  }

  deleteRole(roleId: number): void {
    if (!roleId) return;
    this.rolesService.deleteRole(roleId).subscribe({
      next: () => {
        this.roles = this.roles.filter((role) => role.id !== roleId);
      },
      error: (err) => {
        console.error('Error deleting role:', err);
      },
    });
  }
}
