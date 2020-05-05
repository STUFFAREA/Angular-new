import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
			'confirm_password' : new FormControl(null,[Validators.required]),
    });
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.urlId = params['resetPasswordToken'];
        });    
	}
  onSubmit() {
    // console.log(this.urlId);return;
		if(!this.resetPasswordForm.valid) {
			return;
    }
    var data = {
      'newPassword' : this.resetPasswordForm.value['new_password']
    }
		this.authService.resetPassword(data,this.urlId).subscribe(
      res => {	
			console.log(res);
			// this.errorMsg = null;				
			// this.successMsg = res["message"];
		},
		err => {
			console.log(err);
			// this.successMsg = null;
			// this.errorMsg = err["error"]["message"];				
		});

	}
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('new_password').value !== c.get('confirm_password').value) {
        return {invalid: true};
    }
}
}
