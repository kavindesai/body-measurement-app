import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import {ActivatedRoute} from '@angular/router';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/typings/overlay-directives';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  attributes = [ 'Weight', 'Chest' , 'Waist' , 'Thigh' , 'Neck' ];
  test = [37, 36.5, 36, 35, 32, 30];
  date_values = [0];
  attribute_values = [0];
  concat_values = ['0 0'];
  email = '';

  public show = false;

  constructor(private _endpoints: EndpointsService, private _route: ActivatedRoute) {
    this._route.params.subscribe( params => this.email = params.email);
   }

  ngOnInit() {
  }

  toggle(name) {
   // alert(name);
   console.log(this.email);
   console.log(name);

    if (this.show === true) {
        this.show = false;
        this.date_values = [0];
        this.attribute_values = [0];
        this.concat_values = ['0 0'];
    } else {
      console.log('About to call. Shit gonna go down');
      this._endpoints.get_values(name, this.email)
        .subscribe(
          res => {
            if (res.value !== 'NONE') {
            this.date_values = res.date;
            this.attribute_values = res.value;
            this.concat_it();
            }
          }
        );
      this.show = true;
      console.log(this.date_values);
    }
    
  }
  concat_it() {
    this.concat_values = [];
    for (let i = 0; i < this.attribute_values.length ; i++) {
        this.concat_values.push(this.date_values[i] + '----' + this.attribute_values[i]);
    }
    console.log(this.concat_values);
  }

}
