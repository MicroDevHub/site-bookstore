import { Component, OnInit } from '@angular/core';
import { BookModel, CategoryModel } from '../../../shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService, CategoryService } from '../../../shared/services';
import { of, switchMap } from 'rxjs';
import { IBookCreate } from '../../../shared/models/book/book-create.model';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})

export class BookCreateComponent implements OnInit {
  id: string = '';
  book: BookModel;
  categories: CategoryModel[] = [];
  editMode = false;
  bookForm: FormGroup;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {;
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {
            return this.bookService.getById(params['id']);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((book: BookModel | null) => {
        if (book) {
          this.book = book;
          this.bookForm = new FormGroup({
            title: new FormControl(book.title, Validators.required),
            price: new FormControl(book.price, Validators.required),
            quantity: new FormControl(book.quantity, Validators.required),
            image: new FormControl(book.image, Validators.required),
            description: new FormControl(book.description, Validators.required),
            author: new FormControl(book.author, Validators.required),
            category: new FormControl(book.category.id, Validators.required),
          });
        } else {
          this.bookForm = new FormGroup({
            title: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
            quantity: new FormControl(0, Validators.required),
            image: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            author: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
          });
        }
      });
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response: CategoryModel[]) => {
        this.categories = response;
      });
  }

  onSubmit() {
    const formData = this.bookForm.value;

    if (this.editMode) {
      const bookUpdate: IBookCreate = {
        title: formData.title,
        price: parseInt(formData.price),
        image: formData.image,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        author: formData.author,
        categoryId: formData.category,
      };

      this.bookService.updateBook(this.id, bookUpdate).subscribe((res) => {
        this.router.navigate(['admin/book-management']);
      });
    } else {
      const bookCreate: IBookCreate = {
        title: formData.title,
        price: parseInt(formData.price),
        image: formData.image,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        author: formData.author,
        categoryId: formData.category,
      };

      this.bookService.createBook(bookCreate).subscribe((res) => {
        this.router.navigate(['admin/book-management']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['admin/book-management']);
  }
}
