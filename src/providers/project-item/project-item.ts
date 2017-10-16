import { ENV } from '../../Consts/ConstEnv';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectItemProvider {

  constructor(public http: Http) {
    console.log('Hello ProjectItemProvider Provider');
  }

  createProjecrItem(projectItem) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/createProjecrItem', projectItem, options)
      .map((response) => {
        return response.json()
      });
  }

  getProjectItemById(projectItem) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(ENV.serverUrl + '/api/getProjectItemById/' + projectItem.id, options)
      .map((response) => {
        return response.json()
      });
  }

}
