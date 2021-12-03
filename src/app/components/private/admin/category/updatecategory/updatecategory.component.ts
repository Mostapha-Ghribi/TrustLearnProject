import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {

  updatecatForm: FormGroup

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private service : SpinnerService,
    private router:Router,
    private toastr: ToastrService) {

    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ])
    }

    this.updatecatForm = this.fb.group(formControls);
  }

  get name() { return this.updatecatForm.get('name'); }

  ngOnInit(): void {

    let idCategory = this.route.snapshot.params.id;

    this.categoryService.getCategory(idCategory).subscribe(
      res => {
        this.updatecatForm.patchValue({
          name: (res as any).name
        })

      },
      err => {
        console.log(err);
      }
    )

  }

  updatecat(){
    let data = this.updatecatForm.value;
    let idCategory = this.route.snapshot.params.id;
    let category = new Category(idCategory, data.name);
    this.service.requestStarted();
    this.categoryService.updateCategory(category).subscribe(
      res=>{
        this.service.requestEnded();
        this.toastr.warning("Category updated Successfully");
        this.router.navigate(['/listcategory'])
      },
      err=>{
        this.service.resetSpinner();
        console.log(err);
        
      }
    )
    
  }

}
