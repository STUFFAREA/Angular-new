import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
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
import { bgImg } from '../shared/bgImg';

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
  bgImages : bgImg[] = [];
  baseUrl = 'https://todo-list-task-node.herokuapp.com/';
  fileData: File = null;

  
  constructor(
    private authService : AuthService,
    private router: Router,
    private dialog: MatDialog, 
    private listService : ListService,
    private _snackBar: MatSnackBar,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.getUsername();
    this.getBackgroundImages();
    this.setBackgroundImg();
    this.fetchBgImages();
    
  } 
//---------------------------Methods called on init----------------

// Username for navbar 
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

//  Get background images - custom ['bgImages' array for both custom and default images]
//  Custom images in binary, Default images in .jpg format

//  Get background images - Default [.jpg]
  fetchBgImages() {
    this.authService.fetchBgImages().subscribe(
      res => {
        for( var i in res['message']['imageUrl']) {
          this.bgImages.push({
            'imgUrl' : this.baseUrl+res['message']['imageUrl'][i],
            'type' : res['message']['nameDefault']})
        }
      },
      err => {
        console.log(err)
      }
    )
  }
 
//  Get background images - Custom [binary]
 getBackgroundImages() {
   this.authService.getBackgroundImages().subscribe(
     res => {
       for(var i in res['image']){
         var imgData = 'data:image/png;base64,' + res['image'][i];
         this.bgImages.push({
            'imgUrl' : imgData,
            'type' : 'custom'})
        // })
        //  this.imgdemo = res['image'][i];
       }
     },
     err => {
       console.log(err)
     }
   )
 }

 //Sending selected Bg image to backend
 sendBackground(index,image,type) {
  this.changeBackground(image);
 this.authService.sendBackground(index,type).subscribe(
   res => {
     this.setBackgroundImg();
     this.openSnackBar("Background changed successfully !");
   },
   err => {
     console.log("Error",err)
   }
 )
}
 //Setting selected Bg image
 public setBackgroundImg(){
   this.authService.getBackgroundImage().subscribe(
     res => {
       if(res['image']) {
        var imgData =  this.baseUrl+res['image']
        this.setBackgroundStyle(imgData);  
       }  
     },
     err => {
       console.log(err)
     }
   )
}

 //Generic method to set Bg images on sidenav-content
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

 
 noBackgroundImg() {
   this.renderer.setStyle(document.getElementById('sidenav-content'),
   'background',
   'rgba(232, 232, 232, 0.87)'
 ); 
 }
 setNoBackground() {
  this.authService.sendBackground(null,null).subscribe(
    res => {
      this.noBackgroundImg();
      this.openSnackBar("Background changed successfully !");
    },
    err => {
      console.log("Error",err)
    }
  )
 }
 addCustomgBg(files) {
   if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      document.getElementById('canError').innerHTML = 'Only image file format supported.'
      document.getElementById('canError').style.color = 'red'
      return;
    }
    else {
      this.fileData = files[0];      
  
      const formData = new FormData();
      formData.append('background1', this.fileData);
      // console.log(this.fileData);return;
      if(this.fileData) {
      this.authService.uploadBgImage(formData)
        .subscribe(res => {
          console.log(res);
    });
  }
  } 
 }
 
//---------------------------Dialog box----------------

// Logout
  onLogout() { 
    this.authService.onLogout().subscribe(
      res => {
        localStorage.clear();	
        this.router.navigate(['/login']);
      }      
    );
  }

  // AddList
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

// Edit Profile
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

// Change password
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

//SnackBar for success message
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  
// -------------------------end of dialog box------------------  

//---------------------------Background Sidenav----------------
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
//---------------------------end of Background Sidenav----------------
