import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

  constructor(public http: Http) {
    console.log('Hello FirebaseProvider Provider');
  }

  uploadImage(image: string, projectId: Number): any {
    let storageRef = firebase.storage().ref();
    let imageName = this.generateUUID();
    var imageRef;
    imageRef = storageRef.child(`${projectId}/${imageName}.jpg`);
    return imageRef.putString(image, 'data_url');    
  }

  getImage(projectId: string, imageId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${projectId}/${imageId}`);
    return imageRef.getDownloadURL();
  }

  private generateUUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
