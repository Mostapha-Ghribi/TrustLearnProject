import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { SpinnerService } from 'src/app/spinner.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  
  constructor(private courseService: CourseService, private spinner:SpinnerService,private categoryService: CategoryService, private service: SpinnerService) { }
  public courselist! :Course [];
  public categories: any[] = [];
  
  ngOnInit(): void {
  this.courseService.getAllcourses().subscribe(
      result=>{
        this.courselist = result
        console.log(this.courselist);
      },
      error=>{
        console.log(error);
      }
    );
    this.service.requestStarted();
    this.categoryService.getCategories().subscribe(
      res => {
        this.service.requestEnded();
        this.categories = res;

      },
      err => {
        this.service.resetSpinner();
        console.log(err);

      }
    )
  }
}
