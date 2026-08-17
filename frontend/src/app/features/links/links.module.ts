import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinksRoutingModule } from './links-routing.module';
import { LinksPageComponent } from './pages/links-page/links-page.component';
import { LinksTableComponent } from './components/links-table/links-table.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LinksPageComponent, LinksTableComponent],
  imports: [CommonModule, LinksRoutingModule, SharedModule],
  exports: [LinksPageComponent],
})
export class LinksModule {}
