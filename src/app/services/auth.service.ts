import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isloggedIn = new BehaviorSubject<boolean>(false);

  api_url = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  get isLoggedIn(){
    if(this.checkToken())
      this.isloggedIn.next(true);
    return this.isloggedIn.asObservable();
  }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let ep = this.api_url+'/register';
    return this.http.post(ep, user,{headers: headers});
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let ep = this.api_url+'/authenticate';
    return this.http.post(ep, user,{headers: headers});
  }

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.api_url+'/profile';
    return this.http.get(ep,{headers: headers});
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.isloggedIn.next(true);
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  checkToken(){
    if(localStorage.getItem('id_token')){
      return tokenNotExpired('id_token');
    } else {
      return false;
    }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    this.isloggedIn.next(false);
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }
}