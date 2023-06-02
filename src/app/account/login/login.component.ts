import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/Models/User.model';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';
import { AccountService } from 'src/app/core/apiservises/account.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/core/components/confirm-modal/confirm-modal.component';
import { UserAuthService } from 'src/app/core/Services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router, private globalToastr: GlobalToastrService, private dialog: MatDialog, private userAuthService: UserAuthService) { }

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  get name() {
    return this.loginForm.get('name');
  }
  get password() {
    return this.loginForm.get('userId');
  }

  loginRequest: User = {
    username: '',
    password: '',
    userId: 0,
    dob: new Date(),
    address: '',
  };
  loginError: boolean = false;
  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginForm.valid) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '400px',
        data: {
          title: 'Confirmation',
          message: 'Are you sure you want to login?',
        }
      })
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.loginRequest.username = this.loginForm.controls.name.value;
          this.loginRequest.password = this.loginForm.controls.password.value;
          this.accountService.login(this.loginRequest).subscribe({
            next: (response) => {
              if (response.data !== null) {
                const token = response.token;
                const isLoggedIn = response.success;
                const userResponseData = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userResponseData));
                if (isLoggedIn) {
                  this.userAuthService.setUser(userResponseData);
                  this.router.navigate(['dashboard', 'analytics']);
                  this.globalToastr.showToastr('success', 'Login successfull!');
                } 
              }
              else if(response.data === null && response.message === 'failed' ){
                this.loginError = true;
              }
              else{
                this.globalToastr.showToastr('error', response.message);
              }
            }
          })
        }
      })
    }
  }
}
