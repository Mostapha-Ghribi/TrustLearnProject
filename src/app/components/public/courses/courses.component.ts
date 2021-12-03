import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  
  constructor(private courseService: CourseService, private spinner:SpinnerService) { }
  courselist! :Course [];
  ngOnInit(): void {
  this.courseService.getAllcourses().subscribe(
      result=>{
        this.courselist = result
        console.log(this.courselist);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
