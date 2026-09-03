import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import { Role } from '../../../models/role.interface';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
})
export class RolesTableComponent implements OnInit {
  roles: Role[] = [];
  @Output() deletedRole = new EventEmitter<number>();
  @Output() roleSelected = new EventEmitter<Role>();
  @Output() addedRole = new EventEmitter<Role>();
  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = Array.isArray(res) ? res : (res?.data ?? []);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onEdit(role: Role): void {
    this.roleSelected.emit(role);
  }

  onDelete(roleId: number): void {
    if (roleId) {
      this.deletedRole.emit(roleId);
    }
  }
}
