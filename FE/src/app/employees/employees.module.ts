import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeesFormComponent } from './employees-form';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from './employees.service';

const material = [
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonModule
];

@NgModule({
  declarations: [EmployeesComponent, EmployeesFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: EmployeesComponent}]),
    ReactiveFormsModule,
    ...material
  ],
  entryComponents: [EmployeesFormComponent],
  providers: [EmployeeService]
})
export class EmployeesModule { }
