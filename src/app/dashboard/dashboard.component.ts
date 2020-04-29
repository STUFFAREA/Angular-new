import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ListService } from '../shared/list.service';
import { NewListComponent } from '../new-list/new-list.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild(NewListComponent)
  private newListComponent: NewListComponent;

  username : string;
  firstName : string;
  lastName : string;
  gender : string;
  profession : string;
  phoneNum : number;
  DOB : string;

  constructor(
    private authService : AuthService,
    private router: Router,
    private dialog: MatDialog, 
    private listService : ListService
    ) { }

  ngOnInit(): void {
    this.getUsername();
  } 
 getUsername() {
  this.listService.getUserProfile().subscribe(
    res => {
      for(var i in res) {
        this.username = res[i]['username'];
        this.firstName = res[i]['firstName'];
        this.lastName = res[i]['lastName'];
        this.gender = res[i]['gender'];
        this.profession = res[i]['profession'];   
        this.phoneNum = res[i]['phoneNum'];
        this.DOB = res[i]['DOB'];        
      }
    }
  );

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

  dialogConfig.data = {
    username: this.username ? this.username : '',
    firstName: this.firstName ? this.firstName : '',
    lastName: this.lastName ? this.lastName : '',
    gender: this.gender ? this.gender : '',
    phoneNum: +this.phoneNum ? +this.phoneNum : '',
    profession: this.profession ? this.profession : '',
    DOB: this.DOB ? this.DOB : '',
};
const dialogRef = this.dialog.open(EditProfileComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
         data.DOB ? data.DOB = data.DOB.toISOString(): '';

          this.listService.updateProfile(data).subscribe(
            res => {
              this.getUsername();
              // this.openSnackBar("Updated successfully !");
            },
            err => {
              console.log(err)
            });
        }        
      });
  }
  // openSnackBar(message: string) {
  //   this._snackBar.open(message, '', {
  //     duration: 2000,
  //   });
  // }
changePasswordDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(EditPasswordComponent,dialogConfig);
}
}