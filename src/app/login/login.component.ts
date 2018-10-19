import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { NgForm} from '@angular/forms';
import { EndpointsService } from '../endpoints.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails = new Login('', '');
  constructor(private _endpoints: EndpointsService, private router: Router) { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   alert(this.loginDetails.username);
  //   console.log(this.loginDetails);
  //   // call my service and send data
  // }

  onSubmit(form: NgForm) {
    let formData = form.value;
    console.log('reached here');
    this._endpoints.login(this.loginDetails)
      .subscribe(
        res => {
          if (res.name === 'ERROR') {
            window.alert('Incorrect username or password');
          } else {
           this.router.navigate(['/profile', res.name]);
           this._endpoints.setUserLoggenIn(res.name, this.loginDetails.username);
            }
        },
      );
  }

}
