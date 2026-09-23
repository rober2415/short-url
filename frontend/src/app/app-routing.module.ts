import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

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
        canActivate: [GuestGuard],
        loadChildren: () =>
          import('./features/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        canActivate: [GuestGuard],
        loadChildren: () =>
          import('./features/register/register.module').then(
            (m) => m.RegisterModule,
          ),
      },
      {
        path: 'links',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./features/links/links.module').then((m) => m.LinksModule),
      },
      {
        path: 'analytics',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./features/analytics/analytics.module').then(
            (m) => m.AnalyticsModule,
          ),
      },
      {
        path: 'profile',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule,
          ),
      },
    ],
  },
  {
    path: 'settings',
    canLoad: [AdminGuard],
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
