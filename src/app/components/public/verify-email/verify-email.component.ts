import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/spinner.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router : Router,private userService: UserService, private spinnerService : SpinnerService) { }

  ngOnInit(): void {
    if(this.userService.isverified()){
      this.router.navigateByUrl('/login')
    }
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/home')
    }
    if (this.route.snapshot.queryParams['token'] && this.route.snapshot.queryParams['role']){
      console.log(this.route.snapshot.queryParams['token']!="" && this.route.snapshot.queryParams['role']!="")
    this.spinnerService.requestStarted();
    this.userService.verifyEmail(this.route.snapshot.queryParams['token'],this.route.snapshot.queryParams['role']).subscribe(
      res => {
        this.spinnerService.requestEnded();
        console.log(res)
        this.router.navigateByUrl('/login')

      },
      err => {
        this.spinnerService.resetSpinner();
        console.log(err)
      }
    )
    }
  }


}
