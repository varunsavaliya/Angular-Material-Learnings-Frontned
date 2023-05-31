import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models/User.model';
import { UserService } from 'src/app/core/apiservises/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';
@Component({
  selector: 'app-user-create',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
  addUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dob: new FormControl(new Date()),
    address: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.addUserForm.get('name');
  }
  get address() {
    return this.addUserForm.get('address');
  }

  userCreateRequest: User = {
    userId: 0,
    username: '',
    dob: new Date(),
    address: '',
    password: '',
  };
  constructor(private userService: UserService, private router: Router, private globalToastr: GlobalToastrService) {}

  ngOnInit(): void {}
  addUser() {
    if (this.addUserForm.valid) {
      this.userCreateRequest.username = this.addUserForm.controls.name.value;
      this.userCreateRequest.dob = this.addUserForm.controls.dob.value;
      this.userCreateRequest.address = this.addUserForm.controls.address.value;
      
      this.userService.addUser(this.userCreateRequest).subscribe(
        (createdUser: User) => {
          this.router.navigate(['dashboard','members']);
          this.globalToastr.showToastr('success', createdUser.username + ' has been Added successfully!');
        }
      );
    }
  }
}
