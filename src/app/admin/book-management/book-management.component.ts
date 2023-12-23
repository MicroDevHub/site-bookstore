import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookModel, CategoryModel } from '../../shared/models';
import { BookService, CategoryService } from '../../shared/services';
import { Router } from '@angular/router';
import { BookGetResponse } from '../../shared/models/book/book-response.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss'
})
export class BookManagementComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  
  books: BookModel[] = [];
  categories: CategoryModel[] = [];
  page: number = 1;
  limit: number = 6;
  total: number = 0;
  search: string = '';

  displayedColumns: string[] = ['image', 'title', 'quantity', 'price', 'author', 'category']
  dataSource = new MatTableDataSource<BookModel>(this.books)

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }
  
  private getBooks() {
    this.bookService.getBook(this.limit, this.page, this.search).subscribe((response: BookGetResponse) => {
      this.dataSource = new MatTableDataSource(response.items)
      this.books = response.items;
      this.total = response.totalItems
    })
  }
}
