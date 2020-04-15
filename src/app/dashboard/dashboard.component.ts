import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  title : string;
  constructor(private authService : AuthService,private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserDetails();
  }
 
  onLogout() {
    this.authService.onLogout().subscribe(
      res => {
        window.localStorage.removeItem('token')	
        this.router.navigate(['/login']);
      }      
    );
  }
}
