import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AwsService } from '../services/aws/aws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  longTermTaxForm: FormGroup;
  purchaseYear: string;

  years = [
    { value: '1981-82', viewValue: '1981-82', indexation: 100 },
    { value: '1982-83', viewValue: '1982-83', indexation: 109 },
    { value: '1983-84', viewValue: '1983-84', indexation: 116 },
    { value: '1984-85', viewValue: '1984-85', indexation: 125 },
    { value: '1985-86', viewValue: '1985-86', indexation: 133 },
    { value: '1986-87', viewValue: '1986-87', indexation: 140 },
    { value: '1987-88', viewValue: '1987-88', indexation: 150 },
    { value: '1988-89', viewValue: '1988-89', indexation: 161 },
    { value: '1989-90', viewValue: '1989-90', indexation: 172 },
    { value: '1990-91', viewValue: '1990-91', indexation: 182 },
    { value: '1991-92', viewValue: '1991-92', indexation: 199 },
    { value: '1992-93', viewValue: '1992-93', indexation: 223 },
    { value: '1993-94', viewValue: '1993-94', indexation: 244 },
    { value: '1994-95', viewValue: '1994-95', indexation: 259 },
    { value: '1995-96', viewValue: '1995-96', indexation: 281 },
    { value: '1996-97', viewValue: '1996-97', indexation: 305 },
    { value: '1997-98', viewValue: '1997-98', indexation: 331 },
    { value: '1998-99', viewValue: '1998-99', indexation: 351 },
    { value: '1999-00', viewValue: '1999-00', indexation: 389 },
    { value: '2000-01', viewValue: '2000-01', indexation: 406 },
    { value: '2001-02', viewValue: '2001-02', indexation: 426 },
    { value: '2002-03', viewValue: '2002-03', indexation: 447 },
    { value: '2003-04', viewValue: '2003-04', indexation: 463 },
    { value: '2004-05', viewValue: '2004-05', indexation: 480 },
    { value: '2005-06', viewValue: '2005-06', indexation: 497 },
    { value: '2006-07', viewValue: '2006-07', indexation: 519 },
    { value: '2007-08', viewValue: '2007-08', indexation: 551 },
    { value: '2008-09', viewValue: '2008-09', indexation: 582 },
    { value: '2009-10', viewValue: '2009-10', indexation: 632 },
    { value: '2010-11', viewValue: '2010-11', indexation: 711 },
    { value: '2011-12', viewValue: '2011-12', indexation: 758 },
    { value: '2012-13', viewValue: '2012-13', indexation: 852 },
    { value: '2013-14', viewValue: '2013-14', indexation: 939 },
    { value: '2014-15', viewValue: '2014-15', indexation: 1024 },
    { value: '2015-16', viewValue: '2015-16', indexation: 1081 },
    { value: '2016–17', viewValue: '2016–17', indexation: 1125 },
  ];

  indexedCostOfAcquisition: number;
  capitalGains: number;
  capitalGainsTax: number;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.longTermTaxForm = this.fb.group({
      yearOfPurchase: [''],
      purchasePrice: [0],
      otherPurchaseCosts: [0],
      yearOfSale: [''],
      saleAmount: [0],
      otherSaleCosts: [0],
    });
  }

  calculate(taxForm: FormGroup) {
    if (taxForm.valid) {
      const totalPurchasePrice = taxForm.value['purchasePrice'] + taxForm.value['otherPurchaseCosts'];
      const purchaseYearIndex = this.getIndexation(taxForm.value['yearOfPurchase']);
      const saleYearIndex = this.getIndexation(taxForm.value['yearOfSale']);
      this.indexedCostOfAcquisition = Math.round(saleYearIndex / purchaseYearIndex * totalPurchasePrice);
      this.capitalGains = Math.round(taxForm.value['saleAmount'] - this.indexedCostOfAcquisition);
      this.capitalGainsTax = Math.round(this.capitalGains * 0.2);
    }
  }

  getIndexation(year): number {
    for (let i = 0; i < this.years.length; i++) {
      if (this.years[i].value === year) {
        return this.years[i].indexation;
      }
    }
  }

}
