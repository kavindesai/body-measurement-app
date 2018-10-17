import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointsService } from '../endpoints.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username = '';
  isUserLoggedIn;
  constructor( private router : Router, private _endpoints: EndpointsService) {
      this.isUserLoggedIn = _endpoints.getUserLoggedIn();
      if (this.isUserLoggedIn === true) {
          this.username = _endpoints.getCurUser();
      }
  }

  ngOnInit() {
  }

  loginClick() {
    this.router.navigateByUrl('/login');
  }

  registerClick() {
    this.router.navigateByUrl('/register');
  }

  logoutClick() {
    this._endpoints.logout();
    this.router.navigateByUrl('/');
  }

  goToProfile() {
    let profile_url = '/profile/' + this.username;
    console.log(profile_url);
    this.router.navigateByUrl(profile_url);
  }



}
