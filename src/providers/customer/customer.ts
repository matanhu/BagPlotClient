import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../../Consts/ConstEnv';

@Injectable()
export class CustomerProvider {

  constructor(public http: Http) {
    console.log('Hello CustomerProvider Provider');
  }

  createCustomer(customer) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/createCustomer',customer,options)
      .map((response) => {
        return response.json()
      });
  }

  getCustomersByName(customer) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/getCustomersByName',customer,options)
      .map((response) => {
        return response.json()
      });
  }

}
