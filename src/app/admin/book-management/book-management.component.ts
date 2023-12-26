import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BookModel, CategoryModel } from '../../shared/models';
import { BookService } from '../../shared/services';
import { Router } from '@angular/router';
import { BookGetResponse } from '../../shared/models/book/book-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss'
})
export class BookManagementComponent implements OnInit, OnDestroy {
  books: BookModel[] = [];
  categories: CategoryModel[] = [];
  page: number = 1;
  limit: number = 6;
  total: number = 0;
  search: string = '';
  searchForm: FormGroup;
  $destroy = new Subject();

  displayedColumns: string[] = ['image', 'title', 'quantity', 'price', 'author', 'category', 'actions']
  dataSource = new MatTableDataSource<BookModel>(this.books)

  constructor(
    private bookService: BookService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBooks(6, 1);

    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.$destroy),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((form) => {
          this.search = form.search;
          this.getBooks(this.limit, this.page, undefined, undefined, this.search);
          return EMPTY
        })
      )
      .subscribe();
  }

  private getBooks(limit: number, page: number, sortOrder?: string, sortColumn?: string, search?: string) {
    this.bookService.getBook(limit, page, sortColumn, sortOrder, search).subscribe((response: BookGetResponse) => {
      this.dataSource = new MatTableDataSource(response.items)
      this.books = response.items;
      this.total = response.totalItems;
      this.page = response.currentPage;
    })
  }

  handlePageEvent(e: PageEvent) {
    this.getBooks(e.pageSize, e.pageIndex + 1)
  }

  addBook() {
    this.router.navigate(['/admin/book-create'])
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.getBooks(this.limit, this.page, sort.direction, sort.active)
  }

  editBook(id: number) {
    this.router.navigate([`/admin/book-edit/${id}`])
  }

  removeBook(id: number) {
    this.openDialog(id)
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmTitle = 'Remove Book';
    dialogRef.componentInstance.confirmMessage = 'Would you like to delete book?'
    dialogRef.componentInstance.callbackMethod = () => {
      this.bookService.removeBook(id).subscribe((res) => {
        if (res) {
          this.getBooks(this.limit, this.page)
          dialogRef.componentInstance.closeDialog()
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }
}
