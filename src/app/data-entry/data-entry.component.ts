import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AwsService } from '../services/aws/aws.service';
import { DataFormService } from '../services/data-form/data-form.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
  providers: []
})
export class DataEntryComponent implements OnInit {
  dataForm: FormGroup;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  constructor(
    private fb: FormBuilder,
    private AWS: AwsService,
    private ds: DataFormService,
    private rt: Router
  ) { }

  ngOnInit() {
    this.dataForm = this.fb.group(this.ds.getDataEntryForm())
    // this.AWS.isAuthenticated();
  }

  submit(dataForm) {
    
    // console.log(dataForm)
    this.AWS.predict(dataForm).subscribe((data)=>{
      // console.log(data)
      localStorage.setItem('prediction', JSON.stringify(data))
      // this.rt.navigate(['prediction', data])
      this.rt.navigateByUrl('/prediction', {} )
    }, (err)=>{
      console.log(err)
    })
  }

}
