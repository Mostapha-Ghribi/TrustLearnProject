import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserAPI = "http://localhost:8000/api/user/getUser/"
  private signUp = "http://localhost:8000/api/user/signup";
  private signIn = "http://localhost:8000/api/user/signin";
  private verifyEmail = "http://localhost:8000/api/user/verify-email";
  private forgetPassword = "http://localhost:8000/api/user/forget-password";
  private resetPassword = "http://localhost:8000/api/user/reset-password";
  private getStudentsAPI = "http://localhost:8000/api/user/getAllStudents";
  private getTeachersAPI = "http://localhost:8000/api/user/getAllTeachers";



  private allUsersUrl = "http://localhost:8080/users/all";
  private getOneUserUrl = "http://localhost:8080/users/one/";
  private updateUserUrl = "http://localhost:8080/users/update";
  private deleteUserUrl = "http://localhost:8080/users/delete/";

  


  constructor(private http: HttpClient) { }


  public addUser(user: User) {
    let dataFromAPI = this.http.post<any>(this.signUp, user);
    return dataFromAPI;
  }
  public uploadImage(image: File){
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post('/api/v1/image-upload', formData);
  }

  public loginUser(user: User) {
    let dataFromAPI = this.http.post<any>(this.signIn, user);
    return dataFromAPI;
  }

  public getAllStudents() {
    let data = this.http.get<any>(this.getStudentsAPI);
    return data;
  }

  public getAllTeachers() {
    let data = this.http.get<any>(this.getTeachersAPI);
    return data;
  }
  public getOneUser(id: any) {
    return this.http.get<any>(this.getOneUserUrl + id);
  }

  public updateUser(user: User) {
    return this.http.patch<any>(this.updateUserUrl, user);
  }

  public deleteUser(id: any) {
    return this.http.delete<any>(this.deleteUserUrl + id);
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
