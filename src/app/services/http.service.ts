import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Book } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getBookDetails(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getBookList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Book>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Book>>(`${env.BASE_URL}/books`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Book> {
    const bookInfoRequest = this.http.get(`${env.BASE_URL}/book/${id}`);
    
  
    const bookScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/books/${id}/screenshots`
    );

    return forkJoin({
      bookInfoRequest,
      bookScreenshotsRequest,
     
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['bookInfoRequest'],
          screenshots: resp['bookScreenshotsRequest']?.results,
         
        };
      })
    );
  }
}
