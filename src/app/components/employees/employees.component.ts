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
  public genderType : number;
  public companyListId : number;
  
  
  public employees : Employee[] = []
  public title : string = "Employees" 

  constructor(employeesService : EmployeesService) {
    this.employeesService = employeesService;
   }

  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe((employeesFromApi) =>{
      this.employees = employeesFromApi;
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
      window.location.reload();
    })
  }
  public updateEmployee(id:number ) {
    var updatedEmployee: Employee = {
      id: this.id,
      firstName : this.firstName,
      lastName : this.lastName,
      genderType : this.genderType,
      companyListId : this.companyListId
    }
    this.employeesService.updateEmployee(id, updatedEmployee).subscribe(() =>{   
    this.employees = this.employees.filter(h => h.id !== id);
    })
  }
  

  public deleteEmployee(id: number) : void {
    this.employeesService.deleteEmployee(id).subscribe(() =>{   
    this.employees = this.employees.filter(h => h.id !== id);
    })
  }

}
