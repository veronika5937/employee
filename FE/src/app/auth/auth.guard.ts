import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../shared';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }

    canActivate() {
        if (this.userService.userToken) {
            return true;
        }

        this.router.navigate(['/auth']);
        return false;
    }
}
