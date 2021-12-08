import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-listformateurs',
  templateUrl: './listformateurs.component.html',
  styleUrls: ['./listformateurs.component.css']
})
export class ListformateursComponent implements OnInit {

  TeachersList : any;
  constructor(private userService:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.userService.getAllTeachers().subscribe(
      result=>{
        this.TeachersList = result
        console.log(this.TeachersList);
      },
      error=>{
        console.log(error);
      }
    )
  
  }
  isVerified(user : any){
    return user.isVerified;
  }

}