import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  post : Object;
  constructor(private authService : AuthService,private router: Router) { }

  ngOnInit(): void {
  }
 
  onLogout() {
    this.authService.onLogout().subscribe(
      res => {
        localStorage.clear();	
        this.router.navigate(['/login']);
      }      
    );
  }
}
