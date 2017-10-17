import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  googleLoginUrl: string = environment.login + '/google';
  facebookLoginUrl: string = environment.login + '/facebook';

  constructor() { }

  ngOnInit() {
  }

}
