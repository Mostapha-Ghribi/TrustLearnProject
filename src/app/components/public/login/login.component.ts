import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { 
    let formControls = {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    }

    this.loginForm = this.fb.group(formControls);

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {

    let isLoggedIn = this.userService.isLoggedIn() ;
    if (isLoggedIn){
      this.router.navigate(['/dashboard'])
    }

  }

  login(){
  let data = this.loginForm.value;
    let user = new User(undefined, undefined, undefined, data.email, data.password)

    console.log(user);

    this.userService.loginUser(user).subscribe(
      res => {
        console.log(res);
       let token = res.token ;
        localStorage.setItem("token", token)
        this.router.navigateByUrl('/dashboard')

      },
      err => console.log(err)
    )
  }



}