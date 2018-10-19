import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './register/user';
import { Login } from './login/login';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private isUserLoggedIn;
  private username;
  private emailId;
  _url = 'http://localhost:3000';


  constructor(private _http: HttpClient) {
    this.isUserLoggedIn = false;
   }

   setUserLoggenIn(username, email) {
     this.isUserLoggedIn = true;
     this.username = username;
     this.emailId = email;
   }

   getCurUser() {
     return this.username;
   }

   getCurEmailID() {
     return this.emailId;
   }

   getUserLoggedIn() {
     return this.isUserLoggedIn;
   }

   logout() {
     this.isUserLoggedIn = false;
   }

  enroll(user: User) {
    return this._http.post<any>(this._url + '/register', user);
  }

  login(loginDetails: Login) {
    return this._http.post<any>(this._url + '/login', loginDetails);
  }

  get_values(attribute: String, email: String) {
    let test_data = { att: attribute, emailId : email};
    console.log('About to call');
    return this._http.post<any>(this._url + '/profile', test_data);
    
  }
}
