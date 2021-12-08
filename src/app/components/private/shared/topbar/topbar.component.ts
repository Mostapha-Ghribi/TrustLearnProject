import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
user : any;
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    let email = localStorage.getItem("email") 
    let role = localStorage.getItem("role")
    

    this.userService.getUser(role,email).subscribe(
      result=>{
        this.user = result
        console.log(this.user)
      },
      error=>{
        console.log(error);
      }
    )
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])

  }

}
