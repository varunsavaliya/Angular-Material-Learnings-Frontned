import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models/User.model';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';
import { AccountService } from 'src/app/core/apiservises/account.service';
import { ConfirmModalComponent } from 'src/app/core/components/confirm-modal/confirm-modal.component';
import { UserAuthService } from 'src/app/core/Services/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    dob: new FormControl(null, [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })

  get name() {
    return this.signUpForm.get('name');
  }
  get password() {
    return this.signUpForm.get('userId');
  }
  get address() {
    return this.signUpForm.get('address');
  }

  signUpRequest: User = {
    username: null,
    password: null,
    userId: 0,
    dob: null,
    address: null,
  };
  constructor(private accountService: AccountService, private router: Router, private globalToastr: GlobalToastrService, private dialog: MatDialog, private userAuth: UserAuthService) { }

  ngOnInit(): void {
  }

  signUpUser() {
    if (this.signUpForm.valid) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '400px',
        data: {
          title: 'Confirmation',
          message: 'Are you sure you want to sign up?',
        },
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.signUpRequest.username = this.signUpForm.controls.name.value;
          this.signUpRequest.password = this.signUpForm.controls.password.value;
          this.signUpRequest.dob = this.signUpForm.controls.dob.value;
          this.signUpRequest.address = this.signUpForm.controls.address.value;
          this.accountService.signUp(this.signUpRequest).subscribe({
            next: (response) => {
              if (response.data === null) {
                this.globalToastr.showToastr('error', response.message);
              }
              else {
                const token = response.token;
                const isLoggedIn = response.success;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(response.data));
                if (isLoggedIn) {
                  this.userAuth.setUser(response.data);
                  this.router.navigate(['dashboard', 'analytics']);
                  this.globalToastr.showToastr('success', 'Sign Up successfull!');
                } else {
                  this.globalToastr.showToastr('error', 'Error occured while sign up!');
                }
              }
            },
            error: (error) => {
              this.globalToastr.showToastr('error', error);
            }
          })
        }
      })
    }
  }
}
