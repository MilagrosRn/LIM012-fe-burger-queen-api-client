import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpErrorResponse,
} from '@angular/common/http';
import { User } from './model/user'
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  headers = new HttpHeaders(
    {
      'Authorization': 'Bearer 2635645',
      'Content-Type': 'application/json'
    })

  url: string = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get(this.url, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  postUser(body) {
    return this.http.post(this.url, (body), { headers: this.headers, observe: 'response' })
      .pipe(
        map(resp => resp),//tap(resp => resp),
        catchError(this.handleError)  
      )
  }

  deleteUser(id) {
    return this.http.delete(this.url + '/' + id, { headers: this.headers })
      .pipe(
        tap(resp => resp),
        catchError(this.handleError)
      )
  }

  handleError(errorRes: HttpErrorResponse) {
    if (errorRes.error instanceof ErrorEvent) { //boolean que da el tipo de error
      return throwError('error lado del cliente: ' + errorRes.error.message)// error lado del cliente
    } else {
      return throwError({// error lado del servidor
        status: errorRes.status,
        statusText: errorRes.statusText,
        message: errorRes.message,
      })
    }
  }
}
