import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { RolesService } from '../../../services/roles.service';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  roles: any[] = [];
  @Output() deletedUser = new EventEmitter<number>();
  @Output() userSelected = new EventEmitter<User>();

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  private loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res: any) => {
        this.users = Array.isArray(res) ? res : (res?.data ?? []);
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  private loadRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = Array.isArray(res) ? res : (res?.data ?? []);
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      },
    });
  }

  onEdit(user: User): void {
    this.userSelected.emit(user);
  }

  onDelete(userId: number): void {
    if (userId) {
      this.deletedUser.emit(userId);
    }
  }
}
