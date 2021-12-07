import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getAllTeachers().subscribe(res => {
      console.log(res);
    },
    err =>{
      console.log(err);
    })
  }

}
