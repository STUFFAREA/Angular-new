import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

changePasswordForm : FormGroup;
error : string;

  constructor(
    private authService: AuthService, 
    private router : Router,
    private dialogRef: MatDialogRef<EditPasswordComponent>) {}

	ngOnInit(): void {
		this.changePasswordForm = new FormGroup({
			'oldPassword' : new FormControl(null,[Validators.required]),
			'newPassword' : new FormControl(null,[Validators.required,Validators.minLength(6)])
		});
  }
  

   
  save() {
    if(!this.changePasswordForm.valid) {
			return;
    }
      this.authService.changePassword(this.changePasswordForm.value).subscribe(
        res => {
          this.dialogRef.close(this.changePasswordForm.value);
        },
        err => {
          if(err.status === 400) {
          this.error = err.error['message'];
            const array = err.error;
            for(var i in array) {
              const validationErrors = err.error[i].path;
              Object.values(validationErrors).forEach((val:string) => {
                const formControl = this.changePasswordForm.get(val);
                if (formControl) {
                formControl.setErrors({
                  serverError: err.error[i].context.label
                });		
                }		
              });
            }	          
        }
      });       
  }
  onReset() {
    this.changePasswordForm.reset();
  }
  close() {
    this.dialogRef.close();
  }
}
