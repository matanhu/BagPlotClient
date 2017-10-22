import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENV } from '../../Consts/ConstEnv';

@Injectable()
export class ProjectProvider {

  constructor(public http: Http) {
    console.log('Hello ProjectProvider Provider');
  }


  getCountOfProjects() {
    return this.http.get(ENV.serverUrl + '/api/getCountOfProjects')
      // return this.http.get(ENV.serverUrl + '/api/getAllProjects')
      .map((response) => {
        return response.json();
      });
  }

  createProject(project) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/createProject', project, options)
      .map((response) => {
        return response.json()
      });
  }

  getAllProjects(): Observable<any> {
    return this.http.get(ENV.serverUrl + '/api/getAllProjects')
      // return this.http.get(ENV.serverUrl + '/api/getAllProjects')
      .map((response) => {
        return response.json();
      });
  }

  getProjectByIdClient(projectId) {
    return this.http.get(ENV.serverUrl + '/api/getProjectByIdClient/' + projectId)
      // return this.http.get(ENV.serverUrl + '/api/getAllProjects')
      .map((response) => {
        return response.json();
      });
  }

  updateProject(project) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    // return this.http.post('http://10.0.0.1:3000/api/updateProject', project, options)
    return this.http.put(ENV.serverUrl + '/api/updateProject', project, options)
      .map((response) => {
        return response.json()
      });
  }

  // createDocx(project) {
  //   let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //   let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.ArrayBuffer }); // Create a request option

  //   return this.http.post(ENV.serverUrl + '/api/createDocx', project, options)
  //     .map((response) => {
  //       // return response.json()
  //       var blob = URL.createObjectURL(new Blob([response.blob()],{ type: 'application/docx' }));
  //       // window.location = url;
  //       window.open(blob);
  //     });
  // }

  createDocx(project) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(ENV.serverUrl + '/api/createDocx', project, options)
      .map((response) => {
        return response.json();
      });
  }

}
