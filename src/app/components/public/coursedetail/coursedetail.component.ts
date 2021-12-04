import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from 'src/app/spinner.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  
  constructor(private courseService: CourseService,private route: ActivatedRoute, private spinner:SpinnerService,private router: Router,private userService: UserService) { }
 id:any;
 course:any;
 image! :Course;
 isverified!: Boolean ;
 
  ngOnInit(): void {
    this.isverified = this.userService.isverified() ;
    let idc = this.route.snapshot.params.id;

    this.courseService.getOneCourse(idc).subscribe(
      res=>{
        this.course=res;
        console.log(res);

      },
      err=>{
        console.log(err);
      }
    )

  
  }

  getcourse(){

    if(this.course.price==0){
      this.router.navigate(['/mycourses']);
    } else {
      this.router.navigate(['/home']);
    }



}

}
