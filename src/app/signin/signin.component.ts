import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup

  constructor( private fb: FormBuilder,
    private userService:UserService,
    private router:Router,
    private toastr: ToastrService) {

    let formControls = {
      
      email : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ]),
  

    }

    this.myForm = this.fb.group(formControls);

  }
  get email(){
    return this.myForm.get('email');
  }
 
  get password(){
    return this.myForm.get('password');
  }
 
  ngOnInit(): void {

  }

  signin(){
    let data = this.myForm.value;

    let user = new User(null,null,data.email,null,data.password);

    this.userService.signin(user).subscribe(
      res=>{
        console.log(res);
        let token = res.token;

          this.toastr.success("Welcome");

        localStorage.setItem("myToken",token);
        this.router.navigate(['/']);
      },
      err=>{
        this.toastr.error("Wrong Password");
        
        console.log(err);
        
      }
    )
    
  }

}
