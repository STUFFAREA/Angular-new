import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm : FormGroup;

  constructor(private authService: AuthService,private router: Router) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			'email' : new FormControl(null,[Validators.required,Validators.email]),
			'password' : new FormControl(null,Validators.required)
		});
	}

	onSubmit() {
		if(!this.loginForm.valid) {
			return;
		}
		this.authService.loginUser(this.loginForm.value).subscribe(
		responseData => {		
			this.authService.profile().subscribe(
				res => {
					this.authService.setLoginStatus(true);
					this.router.navigate(['dashboard']);
				},
				err => {
					console.log(err);
				}
			);	
		},
		err => {
		if(err.status === 400) {
		const array = err.error;
		for(var i in array) {
			const validationErrors = err.error[i].path;
			Object.values(validationErrors).forEach((val:string) => {
			  const formControl = this.loginForm.get(val);
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
}
