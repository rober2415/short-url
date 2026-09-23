import { Injectable } from '@angular/core';
import { Toast } from '../../models/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];

  success(message: string, title: string = 'Success'): void {
    this.show({ type: 'success', title, message });
  }

  error(message: string, title: string = 'Error'): void {
    this.show({ type: 'error', title, message });
  }

  show(toast: Toast): void {
    this.toasts.push(toast);
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
