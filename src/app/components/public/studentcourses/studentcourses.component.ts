import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-studentcourses',
  templateUrl: './studentcourses.component.html',
  styleUrls: ['./studentcourses.component.css']
})
export class StudentcoursesComponent implements OnInit {

  constructor(private userService : UserService , private spinnerService : SpinnerService) { }

  ngOnInit(): void {
    this.getCoursesEnrolled();
  }

  getCoursesEnrolled(){
    let email=localStorage.getItem("email");

     this.spinnerService.requestStarted();
     this.userService.getCoursesEnrolled(email).subscribe(
      res=>{
        this.spinnerService.requestEnded();
        console.log(res);
        
  
      },
      err=>{
        this.spinnerService.resetSpinner();
        console.log(err);
      }



     )
      
    }


}
