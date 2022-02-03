import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
                'books-google-host': 'https://www.googleapis.com/books/v1/volumes'
                  },
      setParams: {
        key: 'AIzaSyBytU9GVxUI5x9TqoKkSFJVwtCWykrveGY',
      }
    });
    return next.handle(req);
  }
}
