import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employees: Array<any> =  []
  id: number = -1;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public _utilityService: UtilityService,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.employeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      about: ['', Validators.required],
      joining_date: ['', Validators.required]
    })
    if(this.data) {
      this.fillValue()
    }
    this.getEmployees()
  }

  getEmployees() {
    let employees = this._utilityService.getItem('employees')
    this.employees = (employees) ? employees : []
  }

  fillValue() {
    this.employeeForm.patchValue({
      name: this.data.name,
      position: this.data.position,
      about: this.data.about,
      joining_date: this.data.joining_date
    })
    this.id = this.data.id
  }

  generateUniqueId() {
    let id;
    do {
      id = Math.floor(Math.random() * 100) + 1;
    } while (this.employees.some(employee => employee.id === id));
    return id;
  }

  onSubmit() {
    if(this.employeeForm.valid) {
      let data = this.employeeForm.value
      if(this.id != -1) {
        data.id = this.id
        let index = this.employees.findIndex(employee => employee.id === this.id);
        this.employees[index] = data
      } else {
        data.id = this.generateUniqueId()
        this.employees.push(data)
      }
      this._utilityService.setItem('employees', this.employees)
      this.dialogRef.close();
    } else {
      alert("Please enter correct details")
    }
  }

}
