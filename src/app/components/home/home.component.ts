import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Book } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string;
  public books: Array<Book>;
  private routeSub: Subscription;
  private bookSub: Subscription;


  constructor(    
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        if (params['book-search']) {
          this.searchBooks('metacrit', params['book-search']);
        } else {
          this.searchBooks('metacrit');
        }
      });
  }


  searchBooks(sort: string, search?: string): void {
    this.bookSub = this.httpService
      .getBookList(sort, search)
      .subscribe((bookList: APIResponse<Book>) => {
        this.books = bookList.results;
        console.log(bookList);
      });
  }

  openBookDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
