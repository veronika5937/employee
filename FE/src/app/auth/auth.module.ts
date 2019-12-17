import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [AuthService]
})

export class AuthModule { }
