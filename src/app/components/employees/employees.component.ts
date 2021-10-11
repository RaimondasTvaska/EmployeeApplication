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

  public firstName : string = " ";
  public lastName : string = " ";
  
  
  
  public employees : Employee[] = [
    {firstName:"Julius", lastName:"Ceasar"}
  ]
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
      firstName : this.firstName,
      lastName : this.lastName
    }
  

    this.employeesService.addEmployee(newEmployee).subscribe(() =>{
      this.employees.push(newEmployee);
    })
  }

}
