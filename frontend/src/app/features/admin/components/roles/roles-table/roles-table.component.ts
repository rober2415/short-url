import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Role } from '../../../models/role.interface';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
})
export class RolesTableComponent {
  @Input() roles: Role[] = [];
  @Output() createdRole = new EventEmitter<Role>();
  @Output() updatedRole = new EventEmitter<Role>();
  @Output() deletedRole = new EventEmitter<number>();

  createRole(): void {
    this.createdRole.emit();
  }

  updateRole(role: Role): void {
    this.updatedRole.emit(role);
  }

  deleteRole(id: number): void {
    this.deletedRole.emit(id);
  }
}
