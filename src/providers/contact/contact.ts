import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../../Consts/ConstEnv';

@Injectable()
export class ContactProvider {

  constructor(public http: Http) {
    console.log('Hello ContactProvider Provider');
  }

  createContact(contact) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/createContact',contact,options)
      .map((response) => {
        return response.json()
      });
  }

}
