import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { Product } from '../model/products';
import { catchError, tap } from 'rxjs/operators';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token:string =JSON.parse(localStorage.getItem('usuario'));

  constructor(public http: HttpClient) { }

  public url: string = environment.apiUrl + 'products/';
  private subjectSource = new Subject<void>();
  public countdown$ = this.subjectSource.asObservable();

  headers = new HttpHeaders(
    {
      'Authorization': 'Bearer '+ this.token,
      'Content-Type': 'application/json'
    })

get refresh$(){
  return this.subjectSource
}


  getListProducts(): Observable<any> {
    return this.http.get(this.url, { headers: this.headers });
  }

  postProduct(product: object): Observable<any> {
    return this.http.post(this.url, product, { headers: this.headers })
      .pipe(
        tap(() => {
          this.refresh$.next()
        }),
        catchError(this.handleError),
      )
  }

  updateProduct(body: any, id: string) {
    return this.http.put(this.url + id, body, { headers: this.headers, observe: 'response' })
      .pipe(
        tap(data => data),
        tap(() => {
          this.refresh$.next()
        }),
      catchError(this.handleError),
      )
  }

  deleteProduct(product: any) {
    return this.http.delete(this.url + product.id)
      .pipe(
        catchError(this.handleError),

      )
  }

  handleError(errorRes: HttpErrorResponse) {
    return throwError({
      status: errorRes.status,
      statusText: errorRes.statusText,
      message: errorRes.message,
    })
  }
}
