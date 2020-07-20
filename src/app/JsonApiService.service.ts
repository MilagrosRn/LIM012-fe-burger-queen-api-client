import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JsonApiService {
  
  constructor(private http: HttpClient){}

  getEmployed(url:string){
     return this.http.get(url)
  }
  postEmployed(url:string,object:any){
    return this.http.post(url,object)
 }
 deleteEmployed(url:string,id:any){
  return this.http.delete(url,id)
}
}