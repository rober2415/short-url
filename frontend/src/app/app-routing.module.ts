import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/shortener/shortener.module').then(
        (m) => m.ShortenerModule,
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterModule,
      ),
  },
  {
    path: 'links',
    loadChildren: () =>
      import('./features/links/links.module').then((m) => m.LinksModule),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      import('./features/analytics/analytics.module').then(
        (m) => m.AnalyticsModule,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
