import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './pages/book-list/book-list.component';

@NgModule({
  declarations: [BookListComponent],
  imports: [CommonModule, BooksRoutingModule, HttpClientModule],
})
export class BooksModule {}
