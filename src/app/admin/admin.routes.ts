import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookManagementComponent } from './book-management/book-management.component';
import { BookCreateComponent } from './book-management/book-create/book-create.component';

const routes: Routes = [
  {
    path: 'book-management',
    component: BookManagementComponent,
  },
  {
    path: 'book-create',
    pathMatch: 'full',
    component: BookCreateComponent,
  },
  {
    path: 'book-edit/:id',
    pathMatch: 'full',
    component: BookCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
