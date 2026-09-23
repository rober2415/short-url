import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from '../../models/user.interface';
import { Role } from '../../models/role.interface';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  users$ = this.usersService.users$;
  roles$ = this.rolesService.roles$;

  roles: Role[] = [];
  userSelected: User | null = null;

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe();
    this.rolesService.getRoles().subscribe();
  }

  onCreate(user: CreateUserRequest): void {
    this.usersService.createUser(user).subscribe({
      next: () => this.userSelected = null,
      error: (error) => console.log(error),
    });
  }

  onUpdate(user: UpdateUserRequest): void {
    this.usersService.updateUser(user.id, user).subscribe({
      next: () => this.userSelected = null,
      error: (error) => console.log(error),
    });
  }

  onDelete(userId: number): void {
    if (userId) {
      this.usersService.deleteUser(userId).subscribe();
    }
  }
}
