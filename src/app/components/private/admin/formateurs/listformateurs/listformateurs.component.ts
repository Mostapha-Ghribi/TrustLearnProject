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

  StudentList = [];
  constructor(private userService:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(
      result=>{
        this.StudentList = result
        console.log(this.StudentList);
      },
      error=>{
        console.log(error);
      }
    )
  
  }

  delete(student:User) {

    this.userService.deleteUser(student.id).subscribe(
      res=>{
        this.toastr.error(res.message);
      },
      err =>{
        console.log(err);
      }
    )
  }
}