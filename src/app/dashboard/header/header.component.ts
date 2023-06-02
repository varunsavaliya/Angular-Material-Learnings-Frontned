import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models/User.model';
import { UserAuthService } from 'src/app/core/Services/user-auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private userAuthService: UserAuthService, private router: Router) { }
  userName: string | null = '';
  user: User | null = this.userAuthService.getUser()
  ngOnInit(): void {
    if (this.user !== null) {
      this.userName = this.user.username;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
