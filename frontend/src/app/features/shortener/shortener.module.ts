import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenerRoutingModule } from './shortener-routing.module';
import { UrlInputComponent } from './components/url-input/url-input.component';
import { UrlResultComponent } from './components/url-result/url-result/url-result.component';
import { FormsModule } from '@angular/forms';
import { ShortenerPageComponent } from './pages/shortener-page/shortener-page.component';
import { BenefitsComponent } from './components/benefits/benefits.component';

@NgModule({
  declarations: [UrlInputComponent, UrlResultComponent, ShortenerPageComponent, BenefitsComponent],
  imports: [CommonModule, FormsModule, ShortenerRoutingModule],
  exports: [UrlInputComponent, UrlResultComponent, ShortenerPageComponent, BenefitsComponent],
})
export class ShortenerModule {}
