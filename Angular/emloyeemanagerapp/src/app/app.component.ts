import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] | undefined;
  public deleteEmployee: Employee | undefined;
  public updateEmployee: Employee | undefined;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateEmployee(employee: Employee): void{
    document.getElementById('update-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => { 
        alert(error.message);
      },
    );
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => { 
        addForm.reset();
        alert(error.message);
      },
    );
  }

  public onDeleteEmployee(employeeId?: number): void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
    (response: void) => {
      console.log(response);
      this.getEmployees;
      window.location.reload();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      window.location.reload();
    }
      );
  }

  public searchEmployee(key: string): void {
    const results: Employee[] = [];
    this.employees?.forEach(employee => {
      if (employee.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle?.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    });
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(mode:string, employee?: Employee): any {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'update') {
      button.setAttribute('data-target', '#updateEmployeeModal');
      this.updateEmployee = employee;
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
      this.deleteEmployee = employee;
    }
    container?.appendChild(button);
    button.click();
  }
}
