import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {      
  constructor(private authService :AuthService, private router: Router) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.authService.isLoggedIn()) {      
     return true;      
     }      
     // navigate to login page as user is not authenticated      
  this.router.navigate(['/login']);      
  return false;      
}     
}