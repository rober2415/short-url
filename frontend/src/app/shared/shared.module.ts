import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUrlPipe } from './pipes/clean-url.pipe';
import { ShortUrlPipe } from './pipes/short-url.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [CleanUrlPipe, ShortUrlPipe, ModalComponent],
  imports: [CommonModule],
  exports: [CleanUrlPipe, ShortUrlPipe, ModalComponent],
  providers: [CleanUrlPipe, ShortUrlPipe],
})
export class SharedModule {}
