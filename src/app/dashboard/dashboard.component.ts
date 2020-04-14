import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <p>
      dashboard works!
    </p>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {

  title : string;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
		this.authService.redirectToPost();
  }

}
