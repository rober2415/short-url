import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from '../../../models/role.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permission } from '../../../models/permission.interface';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
})
export class RolesFormComponent implements OnChanges {
  @Input() role: Role | null = null;
  @Input() permissions: Permission[] = [];
  @Output() createdRole = new EventEmitter<CreateRoleRequest>();
  @Output() updatedRole = new EventEmitter<UpdateRoleRequest>();

  roleForm: FormGroup;

  get isEditMode(): boolean {
    return !!this.role;
  }

  constructor(private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      permissions: this.fb.group({}),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['permissions'] || changes['role']) {
      this.updatePermissionsControl();
    }

    if (changes['role']) {
      this.updateFormValues();
    }
  }

  private updateFormValues(): void {
    this.roleForm.patchValue({
      name: this.role?.name ?? '',
    });
  }

  private updatePermissionsControl(): void {
    const controls: Record<number, boolean[]> = {};

    this.permissions.forEach((permission) => {
      controls[permission.id] = [
        this.role?.permissions?.some((p) => p.name === permission.name) ??
          false,
      ];
    });

    this.roleForm.setControl('permissions', this.fb.group(controls));
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    const formValue = this.roleForm.value;
    const selectedPermissions = this.permissions
      .filter((permission) => formValue.permissions[permission.id])
      .map((permission) => permission.name);

    if (this.isEditMode) {
      const data: UpdateRoleRequest = {
        id: this.role!.id,
        name: formValue.name,
        permissions: selectedPermissions,
      };
      this.updatedRole.emit(data);
    } else {
      const data: CreateRoleRequest = {
        name: formValue.name,
        permissions: selectedPermissions,
      };
      this.createdRole.emit(data);
    }
  }
}
