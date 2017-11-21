import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../../Consts/ConstEnv';

@Injectable()
export class AuthenticationProvider {

  constructor(public http: Http) {
    console.log('Hello AuthenticationProvider Provider');
  }

  signup(signupModel) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/signup',signupModel,options)
      .map((response) => {
        return response.json()
      });
  }

  signin(signinModel) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/signin',signinModel,options)
      .map((response) => {
        return response.json()
      });
  }

}
