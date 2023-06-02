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
  minDate: Date;
  maxDate: Date;
  constructor(private userService: UserService, private router: Router, private globalToastr: GlobalToastrService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  addUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dob: new FormControl(null, [Validators.required,]),
    address: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.addUserForm.get('name');
  }
  get address() {
    return this.addUserForm.get('address');
  }
  get dob() {
    return this.addUserForm.get('dob');
  }

  userCreateRequest: User = {
    userId: 0,
    username: '',
    dob: null,
    address: '',
    password: null,
  };

  ngOnInit(): void { }
  addUser() {
    if (this.addUserForm.valid) {
      this.userCreateRequest.username = this.addUserForm.controls.name.value;
      this.userCreateRequest.dob = this.addUserForm.controls.dob.value;
      this.userCreateRequest.address = this.addUserForm.controls.address.value;
      this.userService.addUser(this.userCreateRequest).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['dashboard', 'members']);
            this.globalToastr.showToastr('success', response.message);
          }
          else {
            this.globalToastr.showToastr('error', response.message);
          }
        },
        error: (error) => {
          this.globalToastr.showToastr('error', error);
        }
      });
    }
  }
}
