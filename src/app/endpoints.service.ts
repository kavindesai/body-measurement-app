import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './register/user';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private isUserLoggedIn;
  private username;
  _url = 'http://localhost:3000';

  constructor(private _http: HttpClient) {
    this.isUserLoggedIn = false;
   }

   setUserLoggenIn(username) {
     this.isUserLoggedIn = true;
     this.username = username;
   }

   getCurUser() {
     return this.username;
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
}
