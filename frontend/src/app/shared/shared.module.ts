import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUrlPipe } from './pipes/clean-url.pipe';
import { ShortUrlPipe } from './pipes/short-url.pipe';

@NgModule({
  declarations: [CleanUrlPipe, ShortUrlPipe],
  imports: [CommonModule],
  exports: [CleanUrlPipe, ShortUrlPipe],
  providers: [CleanUrlPipe, ShortUrlPipe],
})
export class SharedModule {}
