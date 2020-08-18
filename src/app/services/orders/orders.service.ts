import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(public http: HttpClient) { }

  url: string = environment.apiUrl;
  private subjectSource = new Subject<void>();
  public countdown$ = this.subjectSource.asObservable();

  headers = new HttpHeaders(
    {
      'Authorization': 'Bearer 2635645',
      'Content-Type': 'application/json'
    }
  );

  get refresh$() {
    return this.subjectSource;
  }

  getListOrders(){
    return this.http.get(`${this.url}orders`, { headers: this.headers });
  }

  updateOrder(order: any) {
    return this.http.put(`${this.url}orders/${order.id}`, order, { headers: this.headers, observe : 'response' })
    .pipe(
      tap(() => {
        this.refresh$.next();
      })
    )
  }
}