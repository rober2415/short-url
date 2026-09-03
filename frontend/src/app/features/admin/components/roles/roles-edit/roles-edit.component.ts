import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '../../../models/role.interface';

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss'],
})
export class RolesEditComponent {
  @Input() role: Role | null = null;
  @Output() roleUpdated = new EventEmitter<Role>();

  onSubmit() {
    if (this.role) {
      this.roleUpdated.emit(this.role);
    }
  }
}
