import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  template: `
    <h3>
      Page Not Found !
    </h3>
    <a routerLink="/">Back to Home page</a>
  `,
  styles: []
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
