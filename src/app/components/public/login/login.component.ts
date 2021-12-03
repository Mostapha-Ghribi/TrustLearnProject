import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private spinner:SpinnerService) { 
    let formControls = {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      role: new FormControl('', [
        Validators.required,
      ])
    }

    this.loginForm = this.fb.group(formControls);

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get role() { return this.loginForm.get('role');  }

  ngOnInit(): void {

    let isLoggedIn = this.userService.isLoggedIn() ;
    if (isLoggedIn){
      this.router.navigate(['/home'])
    }

  }

  login(){
    this.spinner.requestStarted();
  let data = this.loginForm.value;
    let user = new User(undefined, undefined, undefined, data.email, data.password, data.role)


    this.userService.loginUser(user).subscribe(
      res => {
        this.spinner.requestEnded();
        let token = res.token ;
        let email = res.result.email;
        let role = res.role;
        localStorage.setItem("email",email)
        localStorage.setItem("token", token)
        localStorage.setItem("role",role)
        this.router.navigateByUrl('/home')

      },
      err => {
        this.spinner.resetSpinner();
        console.log(err)
      }
    )
  }



}
