import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/book-management',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  }
];
