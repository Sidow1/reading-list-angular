import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Book } from '../interfaces/books.interface';
import { Library, LibraryElement } from '../interfaces/library.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Library>('/assets/books.json').pipe(
      map((data: Library) => {
        // Mapear los datos de Library a Book
        return data.library.map((libraryElement: LibraryElement) => {
          const book = libraryElement.book;
          const author = libraryElement.book.author;
          return {
            title: book.title,
            pages: book.pages,
            genre: book.genre,
            cover: book.cover,
            synopsis: book.synopsis,
            year: book.year,
            ISBN: book.ISBN,
            author: {
              name: author.name,
              otherBooks: author.otherBooks,
            },
          };
        });
      })
    );
  }
}
