import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  addcatForm: FormGroup

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private router : Router,
    private toastr: ToastrService) {

    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ])
    }

    this.addcatForm = this.fb.group(formControls);
  }

  get name() { return this.addcatForm.get('name'); }

  ngOnInit(): void {
  }

  addcat() {
    let data = this.addcatForm.value;
    console.log(data);
    let category = new Category(undefined, data.name);

    this.categoryService.addCategory(category).subscribe(
      res => {
        this.toastr.success("Category added Successfully");
        this.router.navigate(['/listcategory'])
      },
      err => {
        console.log(err);

      }
    )
    
  }

  


  }

