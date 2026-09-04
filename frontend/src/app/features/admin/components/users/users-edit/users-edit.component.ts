import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../models/user.interface';
import { Role } from '../../../models/role.interface';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent {
  @Input() user: User | null = null;
  @Input() roles: Role[] = [];
  @Output() userUpdated = new EventEmitter<any>();

  selectedRole: string = '';

  // Detecta cuándo cambia el usuario seleccionado y marca su rol actual en el <select>
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.selectedRole = this.user.roles && this.user.roles.length > 0 
        ? this.user.roles[0].name 
        : '';
    }
  }

  onSubmit(): void {
    if (this.user) {
      const updatedData = {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        roles: this.selectedRole,
      };
      this.userUpdated.emit(updatedData);
    }
  }
}
