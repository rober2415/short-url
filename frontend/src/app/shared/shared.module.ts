import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUrlPipe } from './pipes/clean-url.pipe';
import { ShortUrlPipe } from './pipes/short-url.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, CleanUrlPipe, ShortUrlPipe, ModalComponent, ToastComponent, ConfirmModalComponent],
  imports: [CommonModule, RouterModule, NgbToastModule],
  exports: [NavbarComponent, FooterComponent, CleanUrlPipe, ShortUrlPipe, ModalComponent, ToastComponent, ConfirmModalComponent],
  providers: [CleanUrlPipe, ShortUrlPipe],
})
export class SharedModule {}
