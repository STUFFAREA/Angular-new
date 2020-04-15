import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

 
changePasswordForm : FormGroup;
successMsg:boolean = false;
error : string =null;

  constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.changePasswordForm = new FormGroup({
			'oldPassword' : new FormControl(null,[Validators.required]),
			'newPassword' : new FormControl(null,[Validators.required])
		});
  }
  
	onSubmit() {
		if(!this.changePasswordForm.valid) {
			return;
    }
    // this.authService.changePassword();   
    this.authService.changePassword(this.changePasswordForm.value).subscribe(
      res => {
		    console.log('Password changed succesfully')
        this.successMsg = true;
      },
      err => {
        // if(err.status === 200) {
        console.log(err);
      // }
    }
    );   
  }
  
  onReset() {
    this.changePasswordForm.reset();
  }
}
