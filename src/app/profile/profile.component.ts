import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  attributes = [ 'Weight', 'Chest' , 'Biceps' , 'Thigh' , 'Hips' ];
  test = [37, 36.5, 36, 35, 32, 30];

  public show = false;

  constructor() { }

  ngOnInit() {
  }

  toggle(name) {
   // alert(name);
    if (this.show === true) {
        this.show = false;
    } else {
      this.show = true;
    }
  }

}
