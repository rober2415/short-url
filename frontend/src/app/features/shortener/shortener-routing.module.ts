import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShortenerPageComponent } from './pages/shortener-page/shortener-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShortenerPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShortenerRoutingModule {}
