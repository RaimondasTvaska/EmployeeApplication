import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http;
  }

  public getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>("https://localhost:44362/Employee")
  }

  public addEmployee(employee:Employee): Observable<number>{
    return this.http.post<number>("https://localhost:44362/Employee", employee)
  }

  public deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`https://localhost:44362/Employee/${id}`);
  }

  public updateEmployee(id: number, employee:Employee): Observable<Employee> {
    return this.http.put<Employee>(`https://localhost:44362/Employee`, employee);
  }
}
