import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _utilityService: UtilityService
  ) { }

  ngOnInit() {
    this._utilityService.removeItem('isLoggedIn')
    this._utilityService.isLoggedIn.next(false);
    
    this.loginForm = this._formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  onSubmit() {
    let data = this.loginForm.value;
    if(data.email == "admin" && data.password == "admin") {
      this._utilityService.isLoggedIn.next(true)
      this._utilityService.setItem('isLoggedIn', true)
      this._router.navigate(['/employee'])
    } else {
      alert("Please enter valid details")
    }
  }
}
