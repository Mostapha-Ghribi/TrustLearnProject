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
  StudentList:any;
  constructor(private userService:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.userService.getAllStudents().subscribe(
      result=>{
        this.StudentList = result
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