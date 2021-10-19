import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  private employeesService : EmployeesService;

  public id : number;
  public firstName : string = " ";
  public lastName : string = " ";
  public genderType : string;
  public companyListId : number;
  
  
  public employees : Employee[] = []
  public editMode : boolean = false;
  public title : string = "Employees" 

  constructor(employeesService : EmployeesService) {
    this.employeesService = employeesService;
   }

  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe((employeesFromApi) =>{
      this.employees = employeesFromApi;
      // this.employees.sort((a, b) => a.firstName.localeCompare(b.firstName))
    })
  }

  public addEmployee(){
    var newEmployee: Employee = {
      id: this.id,
      firstName : this.firstName,
      lastName : this.lastName,
      genderType : this.genderType,
      companyListId : this.companyListId
    }
  

    this.employeesService.addEmployee(newEmployee).subscribe((employeeId) =>{
      newEmployee.id = employeeId;
      this.employees.push(newEmployee);
    })
  }
  public updateEmployee(employee: Employee): void {
    this.editMode = true;

    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.genderType = employee.genderType;
    this.companyListId = employee.companyListId;    
  }

  public sendUpdatedEmployee (){
    var updatedEmployee: Employee = {
      id: this.id,
      firstName : this.firstName,
      lastName : this.lastName,
      genderType : this.genderType,
      companyListId : this.companyListId
    }
    this.employeesService.updateEmployee(updatedEmployee).subscribe(() =>{
      for (let i = 0; i < this.employees.length; i++) {
        const emp = this.employees[i];
        if (emp.id == updatedEmployee.id) {
          emp.firstName = updatedEmployee.firstName;
          emp.lastName = updatedEmployee.lastName;          
          emp.genderType = updatedEmployee.genderType;          
          emp.companyListId = updatedEmployee.companyListId;
          return;          
        }
        
      }
      // ==============
      // labiau sofistikuotas variantas if'o
      // let index = this.employees.map(e => e.id).indexOf(this.id);
      //this.employees[index] = employee;
    })
    this.editMode = false;
  }
  

  public deleteEmployee(id: number) : void {
    this.employeesService.deleteEmployee(id).subscribe(() =>{   
    this.employees = this.employees.filter(h => h.id !== id);
    })
  }

}
