import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	
	successMsg:string = null;
	form:  FormGroup;
	
	constructor(private authService: AuthService, private router: Router) {}
	
	ngOnInit(): void {
		this.form = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'email': new FormControl(null,[Validators.required]),
			'password': new FormControl(null,Validators.required),
		  });
	}

	onSubmit() {
		if(!this.form.valid) {
			alert("Invalid credentials");
			return;
		}
		this.successMsg =null;
		this.authService.registerUser(this.form.value).subscribe(
			res => {
				this.successMsg = res["message"];
			},
			err => {
				if(err.status === 400) {
				const array = err.error;
				for(var i in array) {
					const validationErrors = err.error[i].path;
					Object.values(validationErrors).forEach((val:string) => {
					  const formControl = this.form.get(val);
					  if (formControl) {
						formControl.setErrors({
						  serverError: err.error[i].context.label
						});		
					}		
				});
			}
			console.log(err.error);

		}		


		// this.authService.setLoginStatus(true);
		// this.router.navigate(['dashboard']);
	});
}

onSubmits() {
	console.log(this.form);
}
}