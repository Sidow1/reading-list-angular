import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../interfaces/books.interface';
import { BooksService } from '../../services/books.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Genres } from '../../interfaces/genres.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  public books: Book[] = [];
  public readingList: Book[] = [];
  public totalBooks: number = 0;
  public pagesSlider: number = 0;

  @ViewChild('genreSelect')
  public genreSelect!: ElementRef<HTMLSelectElement>;

  constructor(private fb: FormBuilder, private booksService: BooksService) {}
  ngOnInit(): void {
    this.getBooks();
    this.loadFromLocalStorage();
  }

  get genres(): Genres[] {
    return this.booksService.genres;
  }

  getBooks(): void {
    this.booksService.getBooks().subscribe((books) => {
      this.books = books;
      this.totalBooks = books.length;
    });
  }

  addToReadingList(book: Book): void {
    if (this.readingList.some((item) => item.title === book.title)) return;

    this.readingList.push(book);
    this.saveToLocalStorage(this.readingList);

    this.totalBooks--;
  }

  deleteFromReadingList(book: Book): void {
    const index = this.readingList.indexOf(book);
    this.readingList.splice(index, 1);
    this.saveToLocalStorage(this.readingList);
    this.totalBooks++;
  }

  isInReadingList(book: Book): boolean {
    return this.readingList.includes(book);
  }

  genreFilter(): void {
    if (this.genreSelect.nativeElement.value === Genres.All) this.getBooks();
    else {
      this.booksService
        .getBooksByGenre(this.genreSelect.nativeElement.value as Genres)
        .subscribe((books) => {
          this.books = books;
        });
    }
  }

  pagesFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.pagesSlider = +inputElement.value;
    this.booksService
      .getBooksByPages(+inputElement.value)
      .subscribe((books) => {
        this.books = books;
      });
  }

  saveToLocalStorage(books: Book[]): void {
    localStorage.setItem('readingList', JSON.stringify(books));
  }

  loadFromLocalStorage(): void {
    this.readingList = JSON.parse(localStorage.getItem('readingList') || '[]');
  }
}
