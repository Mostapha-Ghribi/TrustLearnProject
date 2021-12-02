import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  
  constructor(private courseService: CourseService) { }
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
