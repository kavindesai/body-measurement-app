import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public fname = ""
  public lname = ""
  public email = ""
  public password = ""
  public address = ""
  public address2 = ""
  constructor() { }

  ngOnInit() {
  }

}
