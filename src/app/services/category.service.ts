import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private addCategoryUrl = "http://localhost:8080/categories/add";
  private allCategoriesUrl = "http://localhost:8080/categories/all";
  private deleteCategorieUrl = "http://localhost:8080/categories/delete/";
  private getOneCategoryUrl = "http://localhost:8080/categories/one/";
  private updateCategoryUrl = "http://localhost:8080/categories/update";

  constructor(private http: HttpClient) { }

  public addCategory(category: Category) {
    let dataFromAPI = this.http.post<any>(this.addCategoryUrl, category);
    return dataFromAPI;
  }

  public allCategories(){
    let dataFromAPI = this.http.get<any>(this.allCategoriesUrl) ;
    return dataFromAPI ;
  }

  public deleteCategory(id: any){
    let dataFromAPI = this.http.delete<any>(this.deleteCategorieUrl+id) ;
    return dataFromAPI ;
  }

  getOneCategory(id: any){
    return this.http.get<any>(this.getOneCategoryUrl+id) ;
  }

  updateCategory (category:Category){
    return this.http.patch<any>(this.updateCategoryUrl, category) ;
  }

  
}
