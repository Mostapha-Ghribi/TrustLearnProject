import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
 

  isLoggedIn!: Boolean ;
  isverified!: Boolean ;
  role:String | null | undefined;
  email:String | undefined | null;
  user: any;


  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  $(".profile .icon_wrap").on('click',function(){
  $(this).parent().toggleClass("active");
  $(".notifications").removeClass("active");
});

$(".notifications .icon_wrap").on('click',function(){
  $(this).parent().toggleClass("active");
   $(".profile").removeClass("active");
});

$(".show_all .link").on('click',function(){
  $(".notifications").removeClass("active");
  $(".popup").show();
});

$(".close, .shadow").on('click',function(){
  $(".popup").hide();
});

    this.isverified = this.userService.isverified() ;
    this.isLoggedIn = this.userService.isLoggedIn() ;
    let email = localStorage.getItem("email") 
    let role = localStorage.getItem("role")
    

    this.userService.getUser(role,email).subscribe(
      result=>{
        this.user = result
        console.log(this.isverified);
      },
      error=>{
        console.log(error);
      }
    )




  }

  getUserName(){
   return localStorage.getItem("username");
  }


  
  

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    this.router.navigate(['/login'])
  }


}
