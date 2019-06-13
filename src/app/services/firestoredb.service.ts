import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoredbService {

  constructor(private firestore: AngularFirestore) {
  }

  addSwimtime(time) {
    return this.firestore.collection('Swimtimes').add(time);
  }

  getSwimtimes() {
    return this.firestore.collection('Swimtimes').snapshotChanges();
  }

  updateSwimtime(recordID, time) {
    this.firestore.doc('Swimtimes/' + recordID).update(time);
  }

  deleteSwimtime(record_id) {
    this.firestore.doc('Swimtimes/' + record_id).delete();
  }

}
