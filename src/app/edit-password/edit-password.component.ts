import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  changePasswordForm : FormGroup;
successMsg:string = null;
error : string =null;
panelOpenState = false;

  constructor(private authService: AuthService, private router : Router) {}

	ngOnInit(): void {
		this.changePasswordForm = new FormGroup({
			'oldPassword' : new FormControl(null,[Validators.required]),
			'newPassword' : new FormControl(null,[Validators.required,Validators.minLength(6)])
		});
  }
  
	onSubmit() {
		if(!this.changePasswordForm.valid) {
			return;
    }  
    this.authService.changePassword(this.changePasswordForm.value).subscribe(
      res => {
        this.error = null;
		    console.log('Password changed succesfully')
        this.successMsg = res['message'];
        setTimeout(() => this.router.navigate(['/dashboard']),1000);
      },
      err => {
        this.successMsg = null;
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
    }
    );   
  }
  
  onReset() {
    this.changePasswordForm.reset();
  }
}
