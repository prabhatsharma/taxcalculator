import { Component, OnInit } from '@angular/core';
import { AwsService } from '../services/aws/aws.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  visualData;

  constructor(private aws: AwsService) { }

  ngOnInit() {
    AwsService.authResult.next(this.aws.isAuthenticated())
    // console.log(JSON.parse(localStorage.getItem('prediction')))
    this.visualData = JSON.parse(localStorage.getItem('prediction'))
  }

}
