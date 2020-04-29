import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ListService } from '../shared/list.service';
import { NewListComponent } from '../new-list/new-list.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  post : Object;

  @ViewChild(NewListComponent)
  private newListComponent: NewListComponent;
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

  openAddDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(HomeComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.listService.addItems(data).subscribe(
            res => {
              this.newListComponent.getList()
            },
            err => {
              console.log(err)
            });
        }        
      });
}
editProfileDialog(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(EditProfileComponent, dialogConfig);

  // dialogRef.afterClosed().subscribe(
  //     data => {
  //       if(data) {
  //         this.listService.addItems(data).subscribe(
  //           res => {
  //             this.newListComponent.getList()
  //           },
  //           err => {
  //             console.log(err)
  //           });
  //       }        
  //     });
  // }
}
changePasswordDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(EditPasswordComponent,dialogConfig);
}
}