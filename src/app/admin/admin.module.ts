import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BookManagementComponent } from './book-management/book-management.component';
import { AdminRoutingModule } from './admin.routes';
import { BookCreateComponent } from './book-management/book-create/book-create.component';

@NgModule({
  declarations: [],
  imports: [
    BookManagementComponent,
    BookCreateComponent,
    AdminRoutingModule,
    SharedModule,
  ],
  exports: [
    BookManagementComponent,
    BookCreateComponent,
    SharedModule
  ]
})
export class AdminModule { }
