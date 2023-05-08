import { Component, OnInit } from '@angular/core';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/shared/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees = []

  viewStyle = 'grid'
  isLoggedIn = false;

  dialogRefAddEmployee: MatDialogRef<AddEmployeeComponent>;
  constructor(
    private _utilityService: UtilityService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.viewStyle = this._utilityService.getItem('viewStyle') ? this._utilityService.getItem('viewStyle') : 'grid'
    this._utilityService.isLoggedIn.subscribe((val) => {
      this.isLoggedIn = val
    })
    this._utilityService.searchText.subscribe((val) => {
      this.search(val)
    })
    this.getEmployees()
  }

  search(val) {
    this.getEmployees();
    this.employees = this.employees.filter(obj => obj.name.toLowerCase().includes(val.toLowerCase()));
  }

  getEmployees() {
    let employees = this._utilityService.getItem('employees')
    this.employees = (employees) ? employees : []
  }

  changeStyle(style) {
    this.viewStyle = style;
    this._utilityService.setItem('viewStyle', this.viewStyle)
  }

  deleteEmployee(e) {
    if(this.isLoggedIn) {
      let index = this.employees.findIndex(employee => employee.id === e.id);
      this.employees.splice(index, 1);
      this._utilityService.setItem('employees', this.employees)
      this.getEmployees()
    } else {
      this.router.navigate(['/login'])
    }
  }

  editEmployee(e) {
    if(this.isLoggedIn) {
      this.dialogRefAddEmployee = this.dialog.open(AddEmployeeComponent, {
        data: e
      })
      this.dialogRefAddEmployee.afterClosed().subscribe((result) => {
        this.getEmployees()
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

  addEmployee() {
    this.dialogRefAddEmployee = this.dialog.open(AddEmployeeComponent)
    this.dialogRefAddEmployee.afterClosed().subscribe((result) => {
      this.getEmployees()
    })
  }
}
