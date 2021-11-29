import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isAdmin!: Boolean
  public isTrainer!: Boolean
  public isStudent!: Boolean

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.isAdmin = this.userService.isLoggedInAdmin()
    this.isStudent = this.userService.isLoggedInStudent()
    this.isTrainer = this.userService.isLoggedInTrainer()

  }

}
