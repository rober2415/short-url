import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent {
  @Input() user: User | null = null;
  @Output() userUpdated = new EventEmitter<User>();

  onSubmit(): void {
    if (this.user) {
      this.userUpdated.emit(this.user);
    }
  }
}
