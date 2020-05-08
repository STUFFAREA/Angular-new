import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from './user.model';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token')
	})
};

interface TokenResponse { 
	token: string	 
}

export interface UserDetails {
	posts: string;	 
}

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	private token : string;
	posts : string;

	constructor(private http: HttpClient, private router : Router) {}

	private isLogIn = false;

	setLoginStatus(value: boolean) {
		this.isLogIn = value;
		localStorage.setItem('isLogin','true')
	}

	public isLoggedIn(): boolean {      
		let status = false;      
		if (localStorage.getItem('isLogin') == "true") {      
		   status = true;      
		}    
		else {      
		   status = false;      
		   }      
		return status;      
	}    

	private saveToken(token: string): void {
		localStorage.setItem('token', token)	 
		this.token = token		 
	}

	getToken(): string { 
		if (!this.token) {	 
		this.token = localStorage.getItem('token')		 
		}		 
		return this.token		 
	}	

	loginUser(postData: UserData) {
		return this.http.post(environment.apiBaseUrl+'/login',postData)					
				.pipe(map((data: TokenResponse) => {			 
					if (data.token) {		 
					this.saveToken(data.token)			 
					}			 
					return data;			 
				}))      

	}

	registerUser(postData: UserData) {
		return this.http.post(environment.apiBaseUrl+'/register', postData);						
	}

	public profile() { 
		return this.http.get(environment.apiBaseUrl+'/post/',{		 
					headers: { Authorization: this.getToken() }		 
					})
	}

	public getPost() { 
		this.http.get(environment.apiBaseUrl+'/post/',{		 
		headers: { Authorization: this.getToken() }		 
		}).subscribe(
			res => {
				this.setLoginStatus(true);
				this.router.navigate(['dashboard']);
			},
			err => {
				console.log(err);
			}
		);	
	}

	// public getUserDetails(): UserDetails { 
	// 		const token = this.getToken()			 
	// 		let payload;			 
	// 		if (token) {			 
	// 		payload = token.split('.')[1]			 
	// 		payload = window.atob(payload)	
	// 		console.log(JSON.parse(payload))		 
	// 		return JSON.parse(payload)			 
	// 		} else {			 
	// 		return null		 
	// 		}		
	// 	}

	changePassword(postData) {
		return this.http.post(environment.apiBaseUrl+'/change_password', postData, {		 
		headers: { Authorization: this.getToken() }		 
		})
	}
	forgetPassword(postData) {
		return this.http.post(environment.apiBaseUrl+'/forgot_password', postData, {		 
		headers: { Authorization: this.getToken() }		 
		})
	}
	resetPassword(postData,urlId) {
		return this.http.post(environment.apiBaseUrl+'/reset_password/'+urlId, postData)
	}
	uploadImage(formData ) {
      return this.http.post(environment.apiBaseUrl+'/profile/avatar', formData, {
		headers: { Authorization: this.getToken() }, 
		reportProgress: true,
		observe: 'events'		   
		})
	}
	
	public getImage() {
		return this.http.get(environment.apiBaseUrl+'/profile/avatar', {		 
			headers: { Authorization: this.getToken() }		 
			})
	}
	onLogout() {
		return this.http.post(environment.apiBaseUrl+'/signout','', {		 
		headers: { Authorization: this.getToken() }		 
		})
	}
}