import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post : Object;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.post = JSON.parse(localStorage.getItem('data'));
  }

}
