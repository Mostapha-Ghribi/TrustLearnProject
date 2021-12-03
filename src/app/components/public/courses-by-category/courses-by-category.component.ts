import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { SpinnerService } from 'src/app/spinner.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-courses-by-category',
  templateUrl: './courses-by-category.component.html',
  styleUrls: ['./courses-by-category.component.css']
})
export class CoursesByCategoryComponent implements OnInit {

  constructor(private courseService: CourseService,private route: ActivatedRoute,private service: SpinnerService,private categoryService: CategoryService) { }
  courselist! :Course [];
  public categories: any[] = [];
  ngOnInit(): void {
    let idc = this.route.snapshot.params.id;

    this.courseService.getCoursesByCategory(idc).subscribe(
      res=>{
        this.courselist=res;
        console.log(res);

      },
      err=>{
        console.log(err);
      }
    )

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
