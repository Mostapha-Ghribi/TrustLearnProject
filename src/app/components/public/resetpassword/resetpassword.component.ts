import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('', [
        Validators.required
      ])
    }
    this.loginForm = this.fb.group(formControls);


   }
   get password() { return this.loginForm.get('password'); }
  get repassword() { return this.loginForm.get('repassword'); }
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
  let user = new User(undefined, undefined, undefined, undefined, data.password, undefined)

    let resetLink = localStorage.getItem('resetLink');
    let role = localStorage.getItem('roleUser');
        this.userService.resetPass(user,resetLink,role).subscribe(
      res => {
        this.spinner.requestEnded();
        this.ShowSucc(res.message);
       console.log(res);
     

        

      },
      err => {
        this.spinner.resetSpinner();
        this.ShowErr(err.error.error);
        console.log(err)
      }





    )


 
  }
  Navigate(){
    this.router.navigateByUrl('/login')

  }

}
