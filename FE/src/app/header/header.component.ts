import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../shared';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  userToken$: Observable<string>;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userToken$ = this.userService.userToken$;
  }

  logOut() {
    this.userService.removeUser();
    this.router.navigate(['/auth']);
  }

}
