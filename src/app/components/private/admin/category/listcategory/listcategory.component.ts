import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {

  public categories: any[] = [];

  constructor(private categoryService: CategoryService, private service: SpinnerService,    private router:Router    ) { }

  ngOnInit(): void {

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


  delete(category: Category){
    let index = this.categories.indexOf(category) ;
    this.categories.splice(index, 1) ;

    this.categoryService.deleteCategory(category.id).subscribe(
      res=>{
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }

}
