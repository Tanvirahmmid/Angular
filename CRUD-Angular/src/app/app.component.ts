import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeForm: FormGroup;
  employees: Employee[] = [];
  isEdit: boolean = false;
  editedEmployeeIndex!: number;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  addEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }

    const newEmployee: Employee = {
      id: this.employeeForm.value.id,
      name: this.employeeForm.value.name,
      address: this.employeeForm.value.address,
      phoneNumber: this.employeeForm.value.phoneNumber
    };

    if (this.isEdit) {
      this.employees[this.editedEmployeeIndex] = newEmployee;
      this.isEdit = false;
    } else {
      this.employees.push(newEmployee);
    }

    this.employeeForm.reset();
  }

  editEmployee(employee: Employee) {
    this.isEdit = true;
    this.editedEmployeeIndex = this.employees.indexOf(employee);
    this.employeeForm.patchValue({
      id: employee.id,
      name: employee.name,
      address: employee.address,
      phoneNumber: employee.phoneNumber
    });
  }

  deleteEmployee(employee: Employee) {
    const index = this.employees.indexOf(employee);
    if (index > -1) {
      this.employees.splice(index, 1);
    }
  }
}
