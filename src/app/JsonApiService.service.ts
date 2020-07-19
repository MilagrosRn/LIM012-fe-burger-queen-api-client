import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JsonApiServiceService {
  
  constructor(private http: HttpClient){}

  getJson(url:string){
     return this.http.get(url)
  }
}
