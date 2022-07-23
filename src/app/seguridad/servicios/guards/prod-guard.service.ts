import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable } from 'rxjs';
import {TokenService} from "../token.service";

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate{

  realRol: string;

  constructor(private tokenS: TokenService , private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

    const expectedRol = route.data.expectedRol;

    const roles= this.tokenS.getAuthorities();


    this.realRol = 'user';

    roles.forEach(rol=>{
      if(Object.values(rol)[0] === 'ROLE_USER'){
        this.realRol='admin';
      }
    })

    if(!this.tokenS.getToken() || expectedRol.indexOf(this.realRol) ===-1){
      this.router.navigate(["/login"])
      return false;
    }
    return true;
  }
}
