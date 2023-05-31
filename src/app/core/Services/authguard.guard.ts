import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private router: Router, private userAuth: UserAuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userAuth.isLoggedIn()) {
      const requestedRoute = state.url;
      if (requestedRoute.includes('login') || requestedRoute.includes('signup')) {
        this.router.navigate(['dashboard', 'analytics'])
        return false;
      }
      return true;
    }
    else {
      const requestedRoute = state.url;

      if (requestedRoute.includes('login') || requestedRoute.includes('signup')) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }
  }

}
