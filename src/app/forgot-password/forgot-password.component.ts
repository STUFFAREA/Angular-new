import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  forgetPasswordForm : FormGroup;
  successMsg : string;
  errorMsg : string;

  constructor(private authService: AuthService,private router: Router) {}

	ngOnInit(): void {
		this.forgetPasswordForm = new FormGroup({
			'email' : new FormControl(null,[Validators.required,Validators.email]),
		});
	}
  onSubmit() {
		if(!this.forgetPasswordForm.valid) {
			return;
		}
		this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe(
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
