import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-studentcourses',
  templateUrl: './studentcourses.component.html',
  styleUrls: ['./studentcourses.component.css']
})
export class StudentcoursesComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getCoursesEnrolled();
  }

  getCoursesEnrolled(){
    let email=localStorage.getItem("email");


     this.userService.getCoursesEnrolled(email).subscribe(
      res=>{
        console.log(res);
        
  
      },
      err=>{
        
        console.log(err);
      }



     )
      
    }


}
