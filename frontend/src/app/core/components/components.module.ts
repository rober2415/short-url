import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, FooterComponent],
})
export class ComponentsModule {}
