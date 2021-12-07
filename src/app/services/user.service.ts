import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserAPI = "http://localhost:8000/api/user/getUser/"
  private signUpAPI = "http://localhost:8000/api/user/signup";
  private signInAPI = "http://localhost:8000/api/user/signin";
  private verifyEmailAPI = "http://localhost:8000/api/user/verify-email";
  private forgetPasswordAPI = "http://localhost:8000/api/user/forget-password";
  private resetPasswordAPI = "http://localhost:8000/api/user/reset-password";
  private getAllStudentsAPI = "http://localhost:8000/api/user/getAllStudents";
  private enrollInCourseAPI = "http://localhost:8000/api/user/enrollInCourse";
  private getCoursesEnrolledAPI = "http://localhost:8000/api/user/enrolledCourses";
  private getAllTeachersAPI = "http://localhost:8000/api/user/getAllTeachers"


  public resetLink = "";
  public role = "";

  constructor(private http: HttpClient) { }



  public verifyEmail(emailToken:any,role : any){
    let params = new HttpParams();
params=params.append('token', emailToken!= null ? emailToken : "");
params=params.append('role', role!= null ? role : "");
    let dataFromAPI = this.http.get<any>(this.verifyEmailAPI,{params});
    return dataFromAPI;
  }

  public addUser(user: User) {
    let dataFromAPI = this.http.post<any>(this.signUpAPI, user);
    return dataFromAPI;
  }

  public enrollInCourse(email : any,name:any){
    //console.log(email,name);
    let dataFromAPI = this.http.put<any>(this.enrollInCourseAPI,{email , name})
    return dataFromAPI;
  }
  public getCoursesEnrolled(email : any){
    //console.log(email)
    let dataFromAPI = this.http.get<any>(this.getCoursesEnrolledAPI,email)
    return dataFromAPI;
  }
  public loginUser(user: User) {
    let dataFromAPI = this.http.post<any>(this.signInAPI, user);
    return dataFromAPI;
  }

  public forgetPass(user: User) {
    let dataFromAPI = this.http.put<any>(this.forgetPasswordAPI, user);
    console.log(dataFromAPI)
    return dataFromAPI;
  }

  public resetPass(user: any, resetLink:any,role : any) {
    let dataFromAPI = this.http.put<any>(this.resetPasswordAPI+'/'+resetLink+'/'+role, user);
    return dataFromAPI;
  }

  public getAllStudents() {
    let data = this.http.get<any>(this.getAllStudentsAPI);
    return data;
  }

  public getAllTeachers() {
    let data = this.http.get<any>(this.getAllTeachersAPI);
    return data;
  }

  public getUser(role: any,email:any){
    return this.http.get<any>(this.getUserAPI +email+'/'+role);
  }

  isverified(){

    
      let verified = localStorage.getItem("verified");
  
      if (verified=="true") {
        return true;
      } else {
        return false;
      }
  


  }
  
  isLoggedIn() {
    let token = localStorage.getItem("token");

    if (token) {
      return true;
    } else {
      return false;
    }
  }



  isLoggedInAdmin() {
    let token = localStorage.getItem("token");

    if (token) {
      //1 - decodage mta3 token
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      //2 - verification 3al role , ken admin ? true : false
      return decodedToken.role == "admin" ? true : false
    } else {
      return false;
    }
  }


  isLoggedInStudent() {
    
    let token = localStorage.getItem("token");

    if (token) {
      //1 - decodage mta3 token
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      //2 - verification 3al role , ken student ? true : false
      return decodedToken.role == "student" ? true : false
    } else {
      return false;
    }

  }


  isLoggedInTrainer() {
    
    let token = localStorage.getItem("token");

    if (token) {
      //1 - decodage mta3 token
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      //2 - verification 3al role , ken trainer ? true : false
      return decodedToken.role == "trainer" ? true : false
    } else {
      return false;
    }

  }

}
