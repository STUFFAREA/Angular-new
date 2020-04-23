import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ListService } from '../shared/list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  post : Object;

  list = [];
  id = [] ;
  urlId: string;
  
  constructor(
    private authService : AuthService,
    private router: Router,
    private route : ActivatedRoute,
    private dialog: MatDialog, 
    private listService : ListService) { }

  ngOnInit(): void {
          // this.listService.getPosts();
          console.log("i am dashboard")
    this.route.params.subscribe( (params : Params) => this.urlId = params['id'] );    
  }

  onLogout() {
    this.authService.onLogout().subscribe(
      res => {
        localStorage.clear();	
        this.router.navigate(['/login']);
      }      
    );
  }

openDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(HomeComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.listService.addItems(data).subscribe(
            res => {
              // this.listService.getPosts();
              console.log("success")
            },
            err => {
              console.log("err")
            });
        }        
      });
}

}