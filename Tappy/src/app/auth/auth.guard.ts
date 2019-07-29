import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route, UrlSegment, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PM } from '../_shared/variables/routes';
import { ToastService } from '../_shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }


  canLoad( route: Route, segments: UrlSegment[] ): Observable<boolean> | Promise<boolean> | boolean {
    return this.check();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.check();
  }

  private check() {
    if (!this.auth.isUserAuthenticated) {
      this.router.navigateByUrl(PM.nav(PM.R.AUTH));
    }
    return this.auth.isUserAuthenticated;
  }

}
