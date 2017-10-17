import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AwsService } from '../services/aws/aws.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;

  constructor(private aws: AwsService, private rt: Router) { }

  ngOnInit() {
    AwsService.authResult.subscribe(authenticated => {
      this.loggedIn = authenticated;
    })
  }

  logout() {
    localStorage.removeItem('authParams')
    AwsService.authResult.next(false)
    this.rt.navigate(['/home'])
  }
}
