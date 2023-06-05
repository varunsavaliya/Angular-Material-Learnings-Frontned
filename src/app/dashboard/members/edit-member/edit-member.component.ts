import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/Models/User.model';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';
import { UserService } from 'src/app/core/apiservices/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
})
export class EditMemberComponent implements OnInit {
  editUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dob: new FormControl(new Date()),
    address: new FormControl('', [Validators.required]),
    userId: new FormControl(),
  });

  get name() {
    return this.editUserForm.get('name');
  }
  get userId() {
    return this.editUserForm.get('userId');
  }
  get dob() {
    return this.editUserForm.get('dob');
  }
  get address() {
    return this.editUserForm.get('address');
  }
  userDetails: User = {
    userId: 0,
    username: '',
    dob: new Date(),
    address: '',
    password: ''
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private globalToastr: GlobalToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.userService.getUser(id).subscribe({
            next: (response) => {
              this.editUserForm.patchValue({
                name: response.data.username,
                dob: this.datePipe.transform(response.data.dob, 'yyyy-MM-dd'),
                address: response.data.address,
                userId: response.data.userId,
              });
            },
          });
        }
      },
    });
  }

  editUser() {
    if (this.editUserForm.valid) {
      
      this.userDetails.username = this.editUserForm.controls.name.value;
      this.userDetails.dob = this.editUserForm.controls.dob.value;
      this.userDetails.address = this.editUserForm.controls.address.value;
      this.userDetails.userId = this.editUserForm.controls.userId.value;
      this.userService
      .updateUser(JSON.stringify(this.userDetails.userId), this.userDetails)
      .subscribe({
        next: (response) => {
            if (response.success) {
              this.router.navigate(['dashboard', 'members']);
              this.globalToastr.showToastr('success', response.message);
            } else {
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
