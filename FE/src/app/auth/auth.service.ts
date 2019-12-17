import { Injectable } from '@angular/core';
import { LoginUser } from './login/login.interface';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '../shared';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  login(value: LoginUser) {
    return this.http.post<{ accessToken: string }>('http://localhost:3000/auth/login', value).pipe(
      tap(({accessToken}) => this.userService.setUser(accessToken))
    );
  }

  register(value: User) {
    return this.http.post<User>('http://localhost:3000/auth/register', value);
  }
}
