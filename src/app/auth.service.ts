import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from './user.model';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token')
	})
};
interface TokenResponse { 
	token: string	 
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) {}

	private token : string;
	private isLogIn = JSON.parse(localStorage.getItem('isLogin') || 'false');

	setLoginStatus(value: boolean) {
		// this.isLogIn = value;
		localStorage.setItem('isLogin','true');
	}

	get isLoggedIn() {
		return this.isLogIn;
	}

	getToken() {
		return localStorage.getItem('token');
	}

	loginUser(postData: UserData) {
		// Send Http request
		return this.http.post(environment.apiBaseUrl+'/login',postData, httpOptions)      
	}

	registerUser(postData: UserData) {
		// Send Http request
		return this.http.post(environment.apiBaseUrl+'/register', postData, httpOptions)
						
	}
	redirectToPost() {
		this.http.get('http://localhost:3000/api/post',httpOptions).subscribe( 
						res => {
							console.log(res['posts']['title']);
						}
		);
	}
}
