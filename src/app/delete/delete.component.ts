import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  email = '';
  attribute = '';
  date_values = [];
  attribute_values = [];
  concat_values = [];
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
        this.concat_values.push(this.date_values[i].trim() + '-----' + this.attribute_values[i]);
    }
    console.log(this.concat_values);
  }

  delete(attribute) {
    console.log(attribute);
    const split = attribute.split('-----');
    console.log(split);
    const date = split[0].split(' ');
    console.log(date);
    const long_date = date[1] + ' ' + date[2] + ' ' + date[3];
    console.log(long_date);
    const d = new Date(long_date);
    console.log(d);
    const iso_d = d.toISOString();
    console.log(iso_d);
    let iso_d_arr = String(iso_d);
    let iso_d_str = iso_d_arr.split('T');
    console.log(iso_d_str[0]);
  }


}
