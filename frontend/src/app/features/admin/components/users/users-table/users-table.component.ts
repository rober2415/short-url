import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  @Output() deletedUser = new EventEmitter<number>();
  @Output() userSelected = new EventEmitter<User>();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
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

  onEdit(user: User): void {
    this.userSelected.emit(user);
  }

  onDelete(userId: number): void {
    if (userId) {
      this.deletedUser.emit(userId);
    }
  }
}
