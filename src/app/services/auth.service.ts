import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject : BehaviorSubject<any>;
  public user : Observable<any>;
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.userSubject = new BehaviorSubject<any>(sessionStorage.getItem('usuario'));
    this.user = this.userSubject.asObservable();
  }

  postUserLogin(body: object): Observable<any> {
    return this.http.post(`${this.url}auth`, body, { observe: 'response' })
      .pipe(map(userLogged => {
        sessionStorage.setItem('usuario', userLogged['token']);
        this.userSubject.next(body);
          return userLogged;
      }))
  }

}
