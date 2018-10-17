import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointsService } from '../endpoints.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currUser = '';
  userLogged = false;
  constructor( private router : Router, private _endpoints: EndpointsService) {
    console.log('Constructor was called');
  }

  ngOnInit() {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    if (this._endpoints.getUserLoggedIn()) {
      this.currUser = this._endpoints.getCurUser();
      return true;
    } else {
      return false;
    }
  }


  logoutClick() {
    this._endpoints.logout();
  }

  goToProfile() {
    let profile_url = '/profile/' + this.currUser;
    console.log(profile_url);
    this.router.navigateByUrl(profile_url);
  }



}
