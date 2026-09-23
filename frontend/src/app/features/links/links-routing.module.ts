import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinksPageComponent } from './pages/links-page/links-page.component';

const routes: Routes = [
  {
    path: '',
    component: LinksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinksRoutingModule {}
