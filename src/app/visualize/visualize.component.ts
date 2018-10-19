import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../endpoints.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.css']
})
export class VisualizeComponent implements OnInit {

  @ViewChild('lineChart') private chartRef;
  chart: any;
  email = '';
  attribute = '';
  date_values = [];
  attribute_values = [3, 7, 9, 2, 12, 11, 17, 9, 10];


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
        this.create_chart();
        }
      }
    );
  }

  create_chart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.date_values.reverse(),
        datasets: [
          {
            data: this.attribute_values.reverse(),
            borderColor: '#3cba9f',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
}

goBack() {
  this._router.navigate(['/profile', this.email, this.attribute, ]);
}

}
