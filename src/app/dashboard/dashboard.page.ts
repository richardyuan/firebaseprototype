import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FirestoredbService } from '../services/firestoredb.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usrEmail: string;
  existingSwimtimes = [];
  results = [];

  constructor(
    private navController: NavController,
    private authService: AuthenticationService,
    private fsService: FirestoredbService
  ) { }

  ngOnInit() {
    if (this.authService.userDetails()) {
      this.usrEmail = this.authService.userDetails().email;
    } else {
      this.navController.navigateBack('');
    }
  }

  generateSwimtime(min, max, decimals) {
    const random = Math.random() * (max - min) + min;
    const power = Math.pow(10, decimals);
    return Math.floor(random * power) / power;
  }

  generateRecord() {
    let record = {};
    record['email'] = this.usrEmail;
    record['swimtime'] = this.generateSwimtime(46, 58, 2);
    console.log(record);
    return record;
  }

  /**
   * Generates record with logged in email and random swimtime
   */
  sync() {
    this.fsService.addSwimtime(this.generateRecord());
  }

  retrieveSwimtimes() {
    this.fsService.readSwimtimes().subscribe(data => {
      let records = data.map(e => {
        return {
          name: e.payload.doc.data()['email'],
          value: e.payload.doc.data()['swimtime']
        }
      });
      this.existingSwimtimes = this.sortRecords(records);
      console.log(this.existingSwimtimes);
    });
  }

  sortRecords(swimtimes) {
    const x = _.sortBy(swimtimes, ['value']);
    return x;
  }

  visualiseSwimtimes(){
    this.results = [...this.existingSwimtimes]; //array destructure
    console.log(this.results);
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navController.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

}
