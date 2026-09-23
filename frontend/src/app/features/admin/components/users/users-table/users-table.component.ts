import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() createdUser = new EventEmitter<void>();
  @Output() updatedUser = new EventEmitter<User>();
  @Output() deletedUser = new EventEmitter<number>();

  createUser(): void {
    this.createdUser.emit();
  }

  updateUser(user: User): void {
    this.updatedUser.emit(user);
  }

  deleteUser(id: number): void {
    this.deletedUser.emit(id);
  }
}
