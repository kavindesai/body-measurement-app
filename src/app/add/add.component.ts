import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  email = '';
  attribute = '';
  year  = '';
  month = '';
  date  = '';
  new_value;
  constructor(private _endpoints: EndpointsService, private _route: ActivatedRoute, private _router: Router) {
    this._route.params.subscribe( params => {
      this.email = params.email;
      this.attribute = params.attribute;
    } );
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(this.year);
    console.log(this.month);
    console.log(this.date);
    console.log(this.new_value);
    const date_created = this.year + '-' + this.month + '-' + this.date;
    this._endpoints.add_val(date_created, this.new_value, this.email, this.attribute)
      .subscribe(
        res => {
          if (res.name === 'DUPLICATE') {
            window.alert('Date already exists');
          } else {
            this._router.navigate(['/profile', this.email]);
            }
        },
      );

  }

}
