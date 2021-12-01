import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listformation',
  templateUrl: './listformation.component.html',
  styleUrls: ['./listformation.component.css']
})
export class ListformationComponent implements OnInit {

  courses: any[] = [];

  constructor(private courseService: CourseService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.courseService.getAllcourses().subscribe(
      res => {
        this.courses = res;
      },
      err => {
        console.log(err);

      }
    )

  }


  delete(course: Course) {

    let index = this.courses.indexOf(course);
    this.courses.splice(index, 1);

    this.courseService.deleteCourse(course.id).subscribe(
      res => {
        this.toastr.error("Course deleted Successfully");
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }


}
