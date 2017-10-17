import { Component, OnInit } from '@angular/core';
import { AwsService } from '../services/aws/aws.service';

@Component({
  selector: 'app-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.css']
})
export class ProposalFormComponent implements OnInit {

  constructor(private aws: AwsService) { }

  ngOnInit() {
    AwsService.authResult.next(this.aws.isAuthenticated())

  }

}
