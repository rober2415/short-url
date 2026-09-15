import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUrlPipe } from './pipes/clean-url.pipe';
import { ShortUrlPipe } from './pipes/short-url.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, CleanUrlPipe, ShortUrlPipe, ModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, CleanUrlPipe, ShortUrlPipe, ModalComponent],
  providers: [CleanUrlPipe, ShortUrlPipe],
})
export class SharedModule {}
