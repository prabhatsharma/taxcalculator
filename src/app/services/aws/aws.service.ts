import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  static authResult = new Subject<boolean>();

  constructor() {

    this.setAWS()

  }

  isAuthenticated() {
    let authParams = JSON.parse(localStorage.getItem('authParams'))
    if (authParams && (authParams.google || authParams.facebook)) {
      AwsService.authResult.next(true);
      return true;
    } else {
      AwsService.authResult.next(false);
      return false
    }
  }

  getAWS() {
    return AWS;
  }

  setAWS() {
    let Logins;
    let storageToken = JSON.parse(localStorage.getItem('authParams'))
    if (storageToken && storageToken.google) {
      Logins = {
        'accounts.google.com': storageToken.google.id_token
      }
    } else if (storageToken && storageToken.facebook) {
      Logins = {
        'graph.facebook.com': storageToken.facebook.access_token
      }
    }

    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:37561548-8d60-43db-a9e6-b2ca4a30c102',  // unauthenticated cognito Role
      Logins: Logins
    })
  }

  predict(formData: any): Observable<any> {
    this.setAWS();
    let prediction = new Subject<{}>();
    let machinelearning = new AWS.MachineLearning();
    let params = {
      MLModelId: 'ml-ioqoyyKwND1', /* required */
      PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com', /* required */
      Record: formData
    }

    machinelearning.predict(params, (err, data) => {
      if (err) {
        // console.log(err, err.stack); // an error occurred
        prediction.next(err);
      }
      else {
        // console.log(data);           // successful response
        prediction.next(data);
      }
    });

    return prediction.asObservable()
  }
}
