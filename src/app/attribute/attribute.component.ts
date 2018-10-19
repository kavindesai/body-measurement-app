import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  email = '';
  attribute = '';
  test = ['a', 'b', 'c', 'd'];
  date_values = [0];
  attribute_values = [0];
  concat_values = ['0 0'];

  constructor(private _endpoints: EndpointsService, private _route: ActivatedRoute, private _router: Router) {
    this._route.params.subscribe( params => {
      this.email = params.email;
      this.attribute = params.attribute;
    } );
  }

  ngOnInit() {
    this._endpoints.get_values(this.attribute, this.email)
    .subscribe(
      res => {
        if (res.value !== 'NONE') {
        this.date_values = res.date;
        this.attribute_values = res.value;
        this.concat_it();
        }
      }
    );
  }

  concat_it() {
    this.concat_values = [];
    for (let i = 0; i < this.attribute_values.length ; i++) {
        this.concat_values.push(this.date_values[i] + '-----' + this.attribute_values[i]);
    }
    console.log(this.concat_values);
  }

  addVal() {
    console.log('Add was clicked');
    this._router.navigate(['/profile', this.email, this.attribute, 'add']);
  }

  deleteVal() {
    console.log('Delete was clicked');
    this._router.navigate(['/profile', this.email, this.attribute, 'delete']);
  }

  visualizeIt() {
    this._router.navigate(['/profile', this.email, this.attribute, 'visualize']);
  }

  goBack() {
    this._router.navigate(['/profile', this.email]);
  }

}
