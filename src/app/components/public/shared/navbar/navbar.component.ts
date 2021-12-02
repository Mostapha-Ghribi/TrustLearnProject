import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
 

  isLoggedIn!: Boolean ;


  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn() ;


 




  }

  get(){


   return localStorage.getItem("username");


  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(['/login'])
  }

}
