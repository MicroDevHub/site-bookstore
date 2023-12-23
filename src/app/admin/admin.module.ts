import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BookManagementComponent } from './book-management/book-management.component';
import { AdminRoutingModule } from './admin.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    BookManagementComponent,
  ],
  exports: [
    BookManagementComponent
  ]
})
export class AdminModule { }
