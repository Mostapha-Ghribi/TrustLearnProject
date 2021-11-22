import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUserUrl="https://backend-people-crud-app.herokuapp.com/users/register";
  private loginUserUrl="https://backend-people-crud-app.herokuapp.com/users/login";


  constructor(private http: HttpClient) { }


  signup(user : User){
    return this.http.post<any>(this.registerUserUrl, user);
  }

  signin(user:User){
    return this.http.post<any>(this.loginUserUrl, user);
  }
 


}