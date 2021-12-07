import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {
  Teachers : any;
  constructor(private userService : UserService, private spinnerService : SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.requestStarted();
    this.userService.getAllTeachers().subscribe(res => {
      this.Teachers = res;
      this.spinnerService.requestEnded();
      console.log(res);
    },
    err =>{
      this.spinnerService.resetSpinner();
      console.log(err);
    })
  }

}
