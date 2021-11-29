import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
