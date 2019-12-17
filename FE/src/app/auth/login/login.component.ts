import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationPatterns } from '../validation-patterns';
import { AuthService } from '../auth.service';
import { LoginUser } from './login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [ 'verysuk.baranyak@gmail.com', Validators.pattern(ValidationPatterns.email)],
      password: ['Bluechahgh6321']
    });
  }

  onSubmit(value: LoginUser) {
    this.authService.login(value).subscribe(({accessToken}) => this.router.navigate(['/employees']));
  }

}
