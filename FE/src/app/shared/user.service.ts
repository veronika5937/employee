import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

const STORAGE_KEY = 'EmployeeAppUser';

@Injectable()

export class UserService {
  private userTokenSubject: BehaviorSubject<string>;
  public userToken$: Observable<string>;

  constructor() {
    const token = localStorage.getItem(STORAGE_KEY);
    this.userTokenSubject = new BehaviorSubject<string>(token);
    this.userToken$ = this.userTokenSubject.asObservable().pipe(share());
  }

  get userToken(): string {
    return this.userTokenSubject.value;
  }

  setUser(token: string) {
    localStorage.setItem(STORAGE_KEY, token);
    this.userTokenSubject.next(token);
  }

  removeUser() {
    localStorage.removeItem(STORAGE_KEY);
    this.userTokenSubject.next(null);
  }
}
