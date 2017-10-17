import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AwsService } from '../aws/aws.service';

@Injectable()
export class RouteAuthService implements CanActivate {

  constructor(private rt: Router, private aws: AwsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    if(this.aws.isAuthenticated()){
      return true;
    } else {
      this.rt.navigate(['login']);
      return false;
    }
  }
}
