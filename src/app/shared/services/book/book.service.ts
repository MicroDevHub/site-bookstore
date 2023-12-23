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
    search?: String
  ): Observable<BookGetResponse> {
    const url = environment.book.get
      .replace('{limit}', String(limit))
      .replace('{page}', String(page))
      .replace('{search}', String(search));
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
    const book = {
      title: bookCreate.title,
      image: bookCreate.image,
      quantity: bookCreate.quantity,
      price: bookCreate.price,
      description: bookCreate.description,
      author: bookCreate.author,
      category: bookCreate.category,
    };

    return this.httpClient.post<IBookCreate>(environment.book.createBook, {
      ...book,
    });
  }

  updateBook(id: string, bookUpdate: IBookCreate) {
    const book = {
      title: bookUpdate.title,
      image: bookUpdate.image,
      quantity: bookUpdate.quantity.toString(),
      price: bookUpdate.price.toString(),
      description: bookUpdate.description,
      author: bookUpdate.author,
      category: bookUpdate.category,
    };
    const url = environment.book.deleteBook.replace('{id}', id);

    return this.httpClient.put<IBookCreate>(url, {
      ...book,
    });
  }

  delete(id: string) {
    const url = environment.book.deleteBook.replace('{id}', id);
    return this.httpClient.delete<BookModel>(url);
  }
}
