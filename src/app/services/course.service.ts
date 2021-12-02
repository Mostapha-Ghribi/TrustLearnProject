import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  

  private getAllCourses = "http://localhost:8000/api/course/GetAllCourses"; //? get All courses (Without Category)
  private getAllCoursesByCategory = "http://localhost:8000/api/course/GetAllCoursesByCategory"; //? get All courses (With Category) required {name of the category} 
  private getCourse = "http://localhost:8000/api/course/GetCourse/"; //? get Course required {name of the course } hint(_id == name)
  private getAllCoursesByTeacher = "http://localhost:8000/api/course/GetAllCoursesByTeacher"; //? get All Courses By Teacher required {name of the teacher}
  private getCoursesByCategoryIntoArray = "http://localhost:8000/api/course/getCoursesByCategoryIntoArray"; //? get all courses names by category and store them in array 
  

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
    let data = this.http.get<any>(this.getAllCourses);
    return data;
  }

  public deleteCourse(id: any) {
    return this.http.delete<any>(this.deleteCourseUrl + id)
  }

  public getOneCourse(id: any) {
    return this.http.get<any>(this.getCourse + id);
  }

  public updateCourse(course: Course) {
    return this.http.patch<any>(this.updateCourseUrl, course);
  }

}
