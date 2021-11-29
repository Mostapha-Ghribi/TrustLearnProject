import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private addCourseUrl = "http://localhost:8080/courses/add";
  private allCoursesUrl = "http://localhost:8080/courses/all";
  private deleteCourseUrl = "http://localhost:8080/courses/delete/";
  private getOneCourseUrl = "http://localhost:8080/courses/one/";
  private updateCourseUrl = "http://localhost:8080/courses/update";

  constructor(private http: HttpClient) { }

  public addProduct(course: Course) {
    let dataFromAPI = this.http.post<any>(this.addCourseUrl, course);
    return dataFromAPI;
  }


  public getAllcourses() {
    let data = this.http.get<any>(this.allCoursesUrl);
    return data;
  }

  public deleteCourse(id: any) {
    return this.http.delete<any>(this.deleteCourseUrl + id)
  }

  public getOneCourse(id: any) {
    return this.http.get<any>(this.getOneCourseUrl + id);
  }

  public updateCourse(course: Course) {
    return this.http.patch<any>(this.updateCourseUrl, course);
  }

}
