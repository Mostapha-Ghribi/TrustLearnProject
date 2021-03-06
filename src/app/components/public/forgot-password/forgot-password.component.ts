import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loginForm : FormGroup
  messageSucc : String | undefined
  messageErr : String | undefined
  showErrMessage : boolean | undefined
  showSuccMessage : boolean | undefined
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private spinner:SpinnerService,private toastr: ToastrService) { 
    let messageSucc = "";
    let showSuccMessage = false;
    let messageErr = "";
    let showErrMessage = false;
    
    let formControls = {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      role: new FormControl('', [
        Validators.required,
      ])
    }
    this.loginForm = this.fb.group(formControls);

  }
  get email() { return this.loginForm.get('email'); }
  get role() { return this.loginForm.get('role');  }
  ngOnInit(): void {
  }

  ShowSucc(message: string) {
    this.messageSucc = message;
    this.showSuccMessage = true;
}
ShowErr(message: string) {
  this.messageErr = message;
  this.showErrMessage = true;
}
  login(){
    this.spinner.requestStarted();
  let data = this.loginForm.value;
    let user = new User(undefined, undefined, undefined, data.email, undefined, data.role)


    this.userService.forgetPass(user).subscribe(
      res => {
        this.spinner.requestEnded();
        this.ShowSucc(res.message);
        localStorage.setItem('resetLink' ,res.resetLink)
        localStorage.setItem('roleUser' ,res.role)

       // this.toastr.success("reset Password sent to your email");
        console.log(res);

        

      },
      err => {
        this.spinner.resetSpinner();
        this.ShowErr(err.error.error);
        console.log(err)
      }
    )
  }
}
