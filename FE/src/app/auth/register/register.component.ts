import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationPatterns } from '../validation-patterns';
import { AuthService } from '../auth.service';
import { User } from '../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [ '',  Validators.minLength(3)],
      email: [ '', Validators.pattern(ValidationPatterns.email)],
      password: ['', [ Validators.minLength(6), Validators.pattern(ValidationPatterns.password)]]
    });
  }

  onSubmit(value: User) {
    this.authService.register(value).subscribe(() => this.router.navigate(['login']));
  }

}
