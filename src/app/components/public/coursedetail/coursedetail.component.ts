import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {

  constructor(private courseService: CourseService,private route: ActivatedRoute ) { }
 id:any;
 course! :Course ;
  ngOnInit(): void {


    let idc = this.route.snapshot.params.id;


    this.courseService.getOneCourse(idc).subscribe(
      res=>{
        this.course=res;
        console.log(idc);

      },
      err=>{
        console.log(err);
      }
    )

  
  }



}
