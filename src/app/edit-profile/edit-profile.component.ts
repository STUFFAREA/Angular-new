import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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


  constructor(private dialogRef: MatDialogRef<EditProfileComponent>, 
    @Inject(MAT_DIALOG_DATA) private data : any)  {

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
  }
  
	onSubmit() {
		if(!this.editProfileForm.valid) {
			return;
    }  
  }
  
  onReset() {
    this.editProfileForm.reset();
  }
  
  save() {
    if(!this.editProfileForm.valid) {
			return;
		}
    this.dialogRef.close(this.editProfileForm.value);
  }

  close() {
    this.dialogRef.close();
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
}
