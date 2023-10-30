import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/books.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  public books: Book[] = [];
  public readingList: Book[] = [];
  public totalBooks: number = 0;

  constructor(private booksService: BooksService) {}
  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books) => {
      this.books = books;
      this.totalBooks = books.length;
    });
  }

  addToReadingList(book: Book): void {
    if (this.readingList.includes(book)) return;

    this.readingList.push(book);
    this.totalBooks--;
  }

  deleteFromReadingList(book: Book): void {
    const index = this.readingList.indexOf(book);
    this.readingList.splice(index, 1);
    this.totalBooks++;
  }

  isInReadingList(book: Book): boolean {
    return this.readingList.includes(book);
  }
}
