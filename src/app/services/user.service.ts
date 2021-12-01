import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private addUserUrl = "http://localhost:8000/api/user/signup";
  private allUsersUrl = "http://localhost:8080/users/all";
  private getOneUserUrl = "http://localhost:8080/users/one/";
  private updateUserUrl = "http://localhost:8080/users/update";
  private deleteUserUrl = "http://localhost:8080/users/delete/";
  private loginUserUrl = "http://localhost:8000/api/user/signin";


  constructor(private http: HttpClient) { }


  public addUser(user: User) {
    let dataFromAPI = this.http.post<any>(this.addUserUrl, user);
    return dataFromAPI;
  }

  public loginUser(user: User) {
    let dataFromAPI = this.http.post<any>(this.loginUserUrl, user);
    return dataFromAPI;
  }

  public getAllUsers() {
    let data = this.http.get<any>(this.allUsersUrl);
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
