import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUrlPipe } from './pipes/clean-url.pipe';

@NgModule({
  declarations: [
    CleanUrlPipe
  ],
  imports: [CommonModule],
  exports: [CleanUrlPipe],
})
export class SharedModule {}
