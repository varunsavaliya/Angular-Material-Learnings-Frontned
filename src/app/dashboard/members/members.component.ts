import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/Models/User.model';
import{ UserService } from '../../core/apiservises/user.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  url = 'https://localhost:44391/GetUsers';
  constructor(private userService: UserService, private routuer: Router, private globalToastr: GlobalToastrService) {}
  userList: User[] = [];

  displayedColumns: string[] = ['userId', 'username', 'dob', 'address', 'options'];
  dataSource: User[] = [];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.userList = data;
        this.dataSource = this.userList;
      },
    });
  }
  
  deleteUser(id: number) {
    const userId = id.toString();
    this.userService.deleteUser(userId).subscribe({
      next: (result) => {
        this.userService.getAllUsers().subscribe({
          next: (data) => {
            this.userList = data;
        this.dataSource = this.userList;
          },
        });
        this.globalToastr.showToastr('success', result.username + ' has been deleted successfully!');
      },
    });
  }
}
