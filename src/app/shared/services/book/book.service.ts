import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookModel } from '../../models';
import { IBookCreate } from '../../models/book/book-create.model';
import { BookGetResponse } from '../../models/book/book-response.model';

@Injectable()
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBook(
    limit: number,
    page: number,
    sortColumn?: string,
    sortOrder?: string,
    search?: string
  ): Observable<BookGetResponse> {
    const url = environment.book.get
      .replace('{limit}', String(limit))
      .replace('{page}', String(page))
      .replace('{sortColumn}', sortColumn ? String(sortColumn) : 'id')
      .replace('{sortOrder}', sortOrder ? String(sortOrder) : 'asc')
      .replace('{search}', search ? String(search) : '');
    return this.httpClient.get<BookGetResponse>(url);
  }

  getById(id: string): Observable<BookModel> {
    const url = environment.book.getDetail.replace('{id}', id);
    return this.httpClient.get<BookModel>(url);
  }

  getBookByCategory(categoryId: string): Observable<BookGetResponse> {
    const url = environment.book.getByCategory.replace(
      '{categoryId}',
      categoryId
    );
    return this.httpClient.get<BookGetResponse>(url);
  }

  createBook(bookCreate: IBookCreate) {
    return this.httpClient.post<IBookCreate>(environment.book.createBook, {
      ...bookCreate,
    });
  }

  updateBook(id: string, bookUpdate: IBookCreate) {
    const url = environment.book.editBook.replace('{id}', id);

    return this.httpClient.put<IBookCreate>(url, {
      ...bookUpdate,
    });
  }

  removeBook(id: number) {
    const url = environment.book.deleteBook.replace('{id}', String(id));
    return this.httpClient.delete<BookModel>(url);
  }
}
