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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private spinner:SpinnerService,private toastr: ToastrService) {

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
  login(){
   
  let data = this.loginForm.value;
    let newPassword = data.password;

    this.userService.resetPass(newPassword).subscribe(
      res => {
       console.log(res);
     

        

      },
      err => {
        
        console.log(err)
      }





    )


 
  }

}
