import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ListService } from '../shared/list.service';
import { NewListComponent } from '../new-list/new-list.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild(NewListComponent)
  private newListComponent: NewListComponent;

  @ViewChild('drawer', { static: true }) drawer_content : MatSidenav;

  username : string;
  firstName : string;
  lastName : string;
  gender : string;
  profession : string;
  phoneNum : number;
  DOB : string;

  background = [];
  imgdemo;
  bgUrl;
  
  constructor(
    private authService : AuthService,
    private router: Router,
    private dialog: MatDialog, 
    private listService : ListService,
    private _snackBar: MatSnackBar,
    private renderer: Renderer2,
    private el: ElementRef
    ) { }

  ngOnInit(): void {
    this.getUsername();
    this.getBackgroundImages();
    this.setBackgroundImg();
    
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
 getBackgroundImages() {
   this.authService.getBackgroundImages().subscribe(
     res => {
       for(var i in res['image']){
         var imgData = 'data:image/png;base64,' + res['image'][i];
         this.background.push(imgData)
         this.imgdemo = res['image'][i];
       }
     },
     err => {
       console.log(err)
     }
   )
 }
 public setBackgroundImg(){
   this.authService.getBackgroundImage().subscribe(
     res => {
       console.log(res)
       var imgData = 'data:image/png;base64,' + res['image'];
       this.setBackgroundStyle(imgData);    
       this.openSnackBar("Background changed successfully !");
     },
     err => {
       console.log(err)
     }
   )
}
setBackgroundStyle(imgUrl) {
  var imageUrl = 'url('+imgUrl+')'; 

  this.renderer.setStyle(
    document.getElementById('sidenav-content'),
    'background-image',
    imageUrl
  );
  this.renderer.setStyle(
    document.getElementById('sidenav-content'),
    'background-repeat',
    'no-repeat'
  );
  this.renderer.setStyle(
    document.getElementById('sidenav-content'),
    'background-position',
    'center'
  );
  this.renderer.setStyle(
    document.getElementById('sidenav-content'),
    'background-size',
    'cover'
  ); 
}
 changeBackground(image) {
   this.setBackgroundStyle(image);
 }

 sendBackground(index) {
  this.authService.sendBackground(index).subscribe(
    res => {
      console.log("success",res);
    },
    err => {
      console.log("Error",err)
    }
  )
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
              this.newListComponent.getList();
              this.openSnackBar("Added successfully !");
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
        console.log(data);
        if(data) {
          this.listService.updateProfile(data).subscribe(
            res => {
              this.getUsername();
              this.openSnackBar("Updated successfully !");
            },
            err => {
              console.log(err)
            });
        }        
      });
  }
changePasswordDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(EditPasswordComponent,dialogConfig);

  dialogRef.afterClosed().subscribe(
    data => {
      if(data) {
        this.authService.changePassword(data).subscribe(
          res => {
            this.openSnackBar("Password updated successfully !");
          });
        }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  
  changeStyle() {
    this.drawerToggle();
    document.getElementById('dropdown-menu').style.height='500px';
  }
  changeStyleAgain() {
    // document.getElementById('dropdown-menu').style.height='200px';
    this.drawerToggle();

  }
  drawerToggle() {
    this.drawer_content.toggle();
  }
}