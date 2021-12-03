import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private addCategoryAPI = "http://localhost:8000/api/category/CreateCategory";
  private deleteCategoryAPI = "http://localhost:8000/api/category/DeleteCategory/";
  private updateCategoryAPI = "http://localhost:8000/api/category/UpdateCategory"
  private getCategoriesNamesAPI = "http://localhost:8000/api/category/GetCategoriesNames";
  private getCategoryAPI = "http://localhost:8000/api/category/GetCategory/";
  private getCategoriesAPI = "http://localhost:8000/api/category/GetCategories";


  constructor(private http: HttpClient) { }

  public addCategory(category: Category) {
    let dataFromAPI = this.http.post<any>(this.addCategoryAPI, category);
    return dataFromAPI;
  }
  public getCategories(){
    let dataFromAPI = this.http.get<any>(this.getCategoriesAPI);
    return dataFromAPI;
  }

  public deleteCategory(id: any){
    let dataFromAPI = this.http.delete<any>(this.deleteCategoryAPI+id) ;
    return dataFromAPI ;
  }

  getCategoriesNames(){
    return this.http.get<any>(this.getCategoriesNamesAPI) ;
  }

  getCategory(id : any){
    return this.http.get<any>(this.getCategoryAPI + id) ;
  }

  updateCategory (category:Category){
    return this.http.put<any>(this.updateCategoryAPI , category) ;
  }

  
}
