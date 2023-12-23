import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule
  ]
})
export class BookModule { }
