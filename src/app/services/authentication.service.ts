import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  registerUser(val) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(val.email, val.password)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    });
  }

  loginUser(val) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(val.email, val.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            console.log("User has been logged out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return firebase.auth().currentUser;
  }

  federatedLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      let x = result.credential.toJSON;
      console.log(x);
    });
  }

}
