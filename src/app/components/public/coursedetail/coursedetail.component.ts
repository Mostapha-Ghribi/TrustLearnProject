import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from 'src/app/spinner.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  
  constructor(    private toastr: ToastrService,    private courseService: CourseService,private route: ActivatedRoute, private spinner:SpinnerService,private router: Router,private userService: UserService) { }
 id:any;
 course:any;
 name:any;
 email:any;
 image! :Course;
 isverified!: Boolean ;
 
 
  ngOnInit(): void {
   this.init()
   
  }

  getcourse(){
    
    if(this.course.price==0){
      let email=localStorage.getItem("email");
     let name =this.course.name;
     this.spinner.requestStarted();
     this.userService.enrollInCourse(email,name).subscribe(
      res=>{
        this.spinner.requestEnded();
        console.log(res);
        this.router.navigate(['/mycourses']);
  
      },
      err=>{
        this.spinner.resetSpinner();
        this.toastr.success(err.error.message);

        console.log(err.error.message);
      }



     )
      
    } else {
      this.router.navigate(['/home']);
    }



}
init(){
  this.isverified = this.userService.isverified() ;
  let idc = this.route.snapshot.params.id;
  this.spinner.requestStarted()
  this.courseService.getOneCourse(idc).subscribe(
    res=>{
      this.course=res;
      console.log(this.course.chapters);
      
      this.spinner.requestEnded()

    },
    err=>{
      this.spinner.resetSpinner()
      console.log(err);
    }
  )

}

}
