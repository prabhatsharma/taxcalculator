import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AwsService } from '../services/aws/aws.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private aws: AwsService, private rt: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    let provider: string;
    let pParams: any = {};
    this.route.params.forEach((param: any) => {
      provider = param.authprovider;
    });
    this.route.queryParams.forEach((queryParams: any) => {
      pParams[provider] = queryParams;
    });

    console.log(pParams)
    localStorage.setItem('authParams', JSON.stringify(pParams));
    AwsService.authResult.next(this.aws.isAuthenticated())
    setTimeout(()=>{
      this.rt.navigate(['data-entry'])
    }, 3000)
    
  }

}
