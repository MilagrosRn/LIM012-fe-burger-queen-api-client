import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private authService:AuthService, private router: Router){

}

canActivate(): Observable<boolean> {
  return this.authService.user.pipe(
    map(usr => {
      const userOnject = JSON.parse(localStorage.getItem('usuario'));
      if(!usr || userOnject == undefined) {
        this.router.navigate(['/']);
          return false;
      }
      return true;
    })
  )
}

}