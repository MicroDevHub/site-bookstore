import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookManagementComponent } from './book-management/book-management.component';

const routes: Routes = [
  {
    path: 'book-management',
    component: BookManagementComponent,
    // children: [
    //   {
    //     path: 'book-list',
    //     pathMatch: 'full',
    //     component: BookListAdminComponent,
    //   },
    //   {
    //     path: 'book-create',
    //     pathMatch: 'full',
    //     component: BookCreateComponent,
    //   },
    //   {
    //     path: 'book-create/:id/edit',
    //     pathMatch: 'full',
    //     component: BookCreateComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
