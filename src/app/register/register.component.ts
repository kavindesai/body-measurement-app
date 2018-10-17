import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from './user';
import { EndpointsService } from '../endpoints.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userDetails = new User('', '', '', '', '', '');

  constructor(private _endpoints: EndpointsService) {

  }
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('Submit works');
    console.log(this.userDetails);
    let formData = form.value;
    
    this._endpoints.enroll(this.userDetails)
      .subscribe(
        data => console.log('A6It worked! ', data),
        error => console.log('Error!! ' , error)
      );
  }


}
