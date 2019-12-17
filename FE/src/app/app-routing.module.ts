import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/employees' },
  { path: 'employees', loadChildren: () => import('./employees').then(m => m.EmployeesModule), canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth').then(m => m.AuthModule), },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
