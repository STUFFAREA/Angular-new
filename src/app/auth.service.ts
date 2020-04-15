import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from './user.model';
import { environment } from '../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		// 'Authorization': localStorage.getItem('token')
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

	public posts  : string;
	private token : string;

	constructor(private http: HttpClient) {}

	private isLogIn = false;

	setLoginStatus(value: boolean) {
		this.isLogIn = true;
	}

	get isLoggedIn() {
		return this.isLogIn;
	}

	getToken(): string { 
		if (!this.token) {	 
		this.token = localStorage.getItem('token')		 
		}		 
		return this.token		 
		}

	private saveToken(token: string): void {
		localStorage.setItem('token', token)	 
		this.token = token		 
		}

	loginUser(postData: UserData) {
		// Send Http request
		return this.http.post(environment.apiBaseUrl+'/login',postData)					
						.pipe(map((data: TokenResponse) => {			 
							if (data.token) {		 
							this.saveToken(data.token)			 
						}			 
							return data;			 
						}))      
	}

	registerUser(postData: UserData) {
		// Send Http request
		return this.http.post(environment.apiBaseUrl+'/register', postData, httpOptions)
						
	}
	// redirectToPost() {
	// 	this.http.get('http://localhost:3000/api/post',httpOptions).subscribe( 
	// 					res => {
	// 						console.log(res['posts']['title'])
	// 						this.posts =  res['posts']['title'];
	// 						console.log(res['posts']['title'])

	// 					}
	// 	);
	// }
	public profile(): Observable<any> { 
		return this.http.get(`http://localhost:3000/api/post`, {		 
		headers: { Authorization: ` ${this.getToken()}` }		 
		})		 
		}
	public getUserDetails(): UserDetails { 
			const token = this.getToken()			 
			let payload;			 
			if (token) {			 
			payload = token.split('.')[1]			 
			payload = window.atob(payload)	
			console.log(JSON.parse(payload))		 
			return JSON.parse(payload)			 
			} else {			 
			return null		 
			}		
		}
	changePassword(postData) {
		return this.http.post(environment.apiBaseUrl+'/change_password', postData,{		 
			headers: { Authorization: ` ${this.getToken()}` }		 
			}); 

	}

	onLogout() {
		return this.http.post(environment.apiBaseUrl+'/signout','',{		 
			headers: { Authorization: ` ${this.getToken()}` }		 
			}); 
	}
}
