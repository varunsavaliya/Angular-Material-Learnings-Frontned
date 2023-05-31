import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models/User.model';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';
import { AuthService } from 'src/app/core/apiservises/auth.service';
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
    username: '',
    password: '',
    userId: 0,
    dob: null,
    address: '',
  };
  constructor(private authService: AuthService, private router: Router, private globalToastr: GlobalToastrService, private dialog: MatDialog, private userAuth: UserAuthService) { }

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
          console.log(this.signUpRequest)
          this.authService.signUp(this.signUpRequest).subscribe({
            next: (response) => {
              const token = response.token;
              const isLoggedIn = response.response;
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(response.userResponseData));
              if (isLoggedIn) {
                this.userAuth.setUser(response.userResponseData);
                this.router.navigate(['dashboard', 'analytics']);
                this.globalToastr.showToastr('success', 'Sign Up successfull!');
              } else {
                this.globalToastr.showToastr('error', 'Error occured while sign up!');
              }
            }
          })
        }
      })
    }
  }
}
