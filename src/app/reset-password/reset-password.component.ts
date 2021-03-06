import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ControlContainer } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm : FormGroup;
  successMsg : string;
  errorMsg : string;
  urlId : string;

  constructor(private authService: AuthService,private route: ActivatedRoute) {
   
  }

	ngOnInit(): void {
		this.resetPasswordForm = new FormGroup({
			'new_password' : new FormControl(null,[Validators.required]),
			'confirm_password' : new FormControl(null,[Validators.required,passwordConfirming]),
    });
    
    this.resetPasswordForm.controls.new_password.valueChanges
    .subscribe(x=> this.resetPasswordForm.controls.confirm_password.updateValueAndValidity()
    )

    this.route.params
      .subscribe(
        (params: Params) => {
          this.urlId = params['resetPasswordToken'];
        });    
	}
  onSubmit() {
		if(!this.resetPasswordForm.valid) {
      this.resetPasswordForm.markAllAsTouched();
			return;
    }
    var data = {
      'newPassword' : this.resetPasswordForm.value['new_password']
    }
		this.authService.resetPassword(data,this.urlId).subscribe(
      res => {	
			console.log(res);
			this.errorMsg = null;				
			this.successMsg = res["message"];
		},
		err => {
			console.log(err);
			this.successMsg = null;
			this.errorMsg = err["error"]["message"];				
		});

	}
  

}
function passwordConfirming(control: AbstractControl): { invalidMatch: boolean } {
  if(control && control.value!== null || control.value!== 'undefined'){
    const confPass = control.value;
    const passValue = control.root.get('new_password');
    if(passValue) {
      const password = passValue.value;
      if(confPass !== password) {
        return { invalidMatch : true }
      }
    }
  }
  return null;
}