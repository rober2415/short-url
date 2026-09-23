import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../../../models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../models/role.interface';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnChanges {
  @Input() user: User | null = null;
  @Input() roles: Role[] = [];
  @Output() createdUser = new EventEmitter<CreateUserRequest>();
  @Output() updatedUser = new EventEmitter<UpdateUserRequest>();

  userForm: FormGroup;

  get isEditMode(): boolean {
    return !!this.user;
  }

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      roles: this.fb.group({}),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roles'] || changes['user']) {
      this.updateRolesControl();
    }

    if (changes['user']) {
      this.updateFormValues();
    }
  }

  private updateFormValues(): void {
    this.userForm.patchValue({
      name: this.user?.name ?? '',
      email: this.user?.email ?? '',
      password: '',
    });

    this.userForm
      .get('password')
      ?.setValidators(
        this.isEditMode
          ? [Validators.minLength(8)]
          : [Validators.required, Validators.minLength(8)],
      );

    this.userForm.get('password')?.updateValueAndValidity();
  }

  private updateRolesControl(): void {
    const controls: Record<number, boolean[]> = {};

    this.roles.forEach((role) => {
      controls[role.id] = [
        this.user?.roles?.some((userRole) => userRole.name === role.name) ??
          false,
      ];
    });

    this.userForm.setControl('roles', this.fb.group(controls));
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const formValue = this.userForm.value;
    const selectedRoles = this.roles
      .filter((role) => formValue.roles[role.id])
      .map((role) => role.name);

    if (this.isEditMode) {
      const data: UpdateUserRequest = {
        id: this.user!.id,
        name: formValue.name,
        email: formValue.email,
        password: formValue.password || undefined,
        roles: selectedRoles,
      };
      this.updatedUser.emit(data);
    } else {
      const data: CreateUserRequest = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        roles: selectedRoles,
      };
      this.createdUser.emit(data);
    }
  }
}
