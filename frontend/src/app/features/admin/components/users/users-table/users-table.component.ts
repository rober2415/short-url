import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  public users: any[] = [];

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
}
