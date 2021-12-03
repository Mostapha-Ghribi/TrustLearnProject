import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Course } from 'src/app/models/course';
import { CategoryService } from 'src/app/services/category.service';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateformation',
  templateUrl: './updateformation.component.html',
  styleUrls: ['./updateformation.component.css']
})
export class UpdateformationComponent implements OnInit {

  updateForm: FormGroup

  public categories: any[] = [];

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private toastr: ToastrService) {

    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+")
      ]),
      image: new FormControl('', [
        Validators.required
      ]),
     
    }

    this.updateForm = this.fb.group(formControls);

  }

  get name() { return this.updateForm.get('name'); }
  get description() { return this.updateForm.get('description'); }
  get price() { return this.updateForm.get('price'); }
  get image() { return this.updateForm.get('image'); }


  ngOnInit(): void {


    let idCourse = this.route.snapshot.params.id;

    this.courseService.getOneCourse(idCourse).subscribe(
      res => {
        let course = res;
        console.log(idCourse);
        this.updateForm.patchValue({
          name: course.name,
          description: course.description,
          price: course.price,
          
        })

      },
      err => {
        console.log(err);

      }
    )

   

  }

  update() {
    let data = this.updateForm.value;
    let idCourse = this.route.snapshot.params.id;
    let product = new Course(idCourse, data.name, data.description, data.image, data.price);

    this.courseService.updateCourse(product).subscribe(
      res => {
        this.toastr.warning("Category updated Successfully");
        this.router.navigate(['/listformation']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
