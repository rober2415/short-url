import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
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
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule,
          ),
      },
    ],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
