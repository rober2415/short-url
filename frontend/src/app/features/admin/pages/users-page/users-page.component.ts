import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(user: User): void {
    this.usersService.updateUser(user.id, user).subscribe({
      next: () => {
        this.selectedUser = null;
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }

  deleteUser(userId: number): void {
    if (!userId) return;
    this.usersService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      },
    });
  }
}
