import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-listetudiant',
  templateUrl: './listetudiant.component.html',
  styleUrls: ['./listetudiant.component.css']
})
export class ListetudiantComponent implements OnInit {
  StudentList = [];
  constructor(private userService:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.userService.getAllStudents().subscribe(
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