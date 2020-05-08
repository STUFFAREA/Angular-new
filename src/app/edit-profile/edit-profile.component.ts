import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../auth.service';
import { HttpEventType } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

 
editProfileForm : FormGroup;
gender: string[] = ['Male','Female','Other'];
profession: string[] = ['Student','Employee','Other'];
minDate: Date;
maxDate: Date;
username: string;

public imagePath;
imgURL: any;
public message: string;
imageChangedEvent: any = '';
  croppedImage: any = '';
  fileData: File = null;
  uploadedFilePath: string = null;
  imagData;
  fileUploadProgress;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  bufferValue = 100;


  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>, 
    @Inject(MAT_DIALOG_DATA) private data : any,
    private authService : AuthService)  {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 40, 0, 1);
    this.maxDate = new Date(currentYear - 10, 11, 31);
  }

	ngOnInit(): void {

		this.editProfileForm = new FormGroup({
			'username' : new FormControl(this.data ? this.data.username :  null,[Validators.required]),
			'firstName' : new FormControl(this.data ? this.data.firstName :  null),
			'lastName' : new FormControl(this.data ? this.data.lastName :  null),
			'gender' : new FormControl(this.data ? this.data.gender : null),
			'DOB' : new FormControl(this.data ? this.data.DOB : null),
			'phoneNum' : new FormControl(this.data ? this.data.phoneNum : null),
			'profession' : new FormControl(this.data ? this.data.profession : null),
    });
    this.username = this.data.username;
    this.getImage();    
  }

  getImage() {
    this.authService.getImage().subscribe(
      res => {
        this.imgURL = 'data:image/png;base64,' + res;
      },
      err => {
          console.log('erorr');
        }
    );
  }

  onSubmit() {
    if(!this.editProfileForm.valid) {
			return;
    }  
    const formData = new FormData();
      formData.append('avatar', this.fileData);
      console.log(this.fileData)
      this.authService.uploadImage(formData)
        .subscribe(res => {
          // console.log('SUCCESS');
          // this.uploadedFilePath = res.data.filePath;
        },
        err => {
          console.log(err)
        })
}
  onReset() {
    this.editProfileForm.reset();
  }
  
  save() {
    if(!this.editProfileForm.valid) {
			return;
    }
    const formData = new FormData();
      formData.append('avatar', this.fileData);
      if(this.fileData) {
      this.authService.uploadImage(formData)
        .subscribe(events => {
          console.log(events);
          if(events.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100);
            console.log(this.fileUploadProgress);
          // this.uploadedFilePath = res.data.filePath;
        } else if(events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          console.log(events.body);   
          this.dialogRef.close(this.editProfileForm.value);

        }
      },
        err => {
          this.message = err.error['error'];
        })
      }else{
        this.dialogRef.close(this.editProfileForm.value);

      }
  }

  close() {
    this.dialogRef.close();
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only image file format supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.fileData = files[0];
    }
  }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
}
