import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from './user';
import { EndpointsService } from '../endpoints.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userDetails = new User('', '', '', '', '', '');

  constructor(private _endpoints: EndpointsService, private router: Router) {

  }
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let formData = form.value;
    
    this._endpoints.enroll(this.userDetails)
      .subscribe(
        res => {
          if (res.name === 'DUPLICATE') {
            window.alert('Email ID already exists');
          } else {
            this.router.navigate(['/profile', this.userDetails.emailID]);
            this._endpoints.setUserLoggenIn(res.name, res.emailID);
            }
        },
      );
  }


}
