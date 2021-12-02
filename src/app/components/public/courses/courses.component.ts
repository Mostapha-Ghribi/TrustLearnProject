import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courselist = []
  constructor(private courseService: CourseService) { }

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
