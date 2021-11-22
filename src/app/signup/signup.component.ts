import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup

  constructor(private fb: FormBuilder,private userService:UserService,private router:Router,private toastr: ToastrService) {

    let formControls = {
      
      firstname : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(4)
      ]),
      lastname : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(4)
      ]),
      email : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      phone : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(8)
      ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ]),
      repassword: new FormControl('',[
        Validators.required,
      ]),
      role: new FormControl('',[
        Validators.required,
      ])

    }

    this.myForm = this.fb.group(formControls);

  }

  get firstname(){
    return this.myForm.get('firstname');
  }
  get lastname(){
    return this.myForm.get('lastname');
  }
  get email(){
    return this.myForm.get('email');
  }
  get phone(){
    return this.myForm.get('phone');
  }
  get password(){
    return this.myForm.get('password');
  }
  get repassword(){
    return this.myForm.get('repassword');
  }
  get role(){
    return this.myForm.get('role');
  }
  ngOnInit(): void {

  }

  signup(){
    let data = this.myForm.value;

    let user = new User(data.firstname,data.lastname,data.email,data.phone,data.password,data.role);

    this.userService.signup(user).subscribe(
      res=>{
        console.log(res);
        this.toastr.success("Welcome");
        this.router.navigate(['/signin']);
      },
      err=>{
        console.log(err);
      }
    )
    
  }

}