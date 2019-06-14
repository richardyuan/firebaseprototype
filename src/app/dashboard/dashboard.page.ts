import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FirestoredbService } from '../services/firestoredb.service';
import * as _ from 'lodash';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usrEmail: string;
  usrSwimtime: number = 0;
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

  getSwimtime() {
    let record = {};
    record['email'] = this.usrEmail;
    record['swimtime'] = this.generateSwimtime(46, 58, 2);
    console.log(record);
    return record;
  }

  sync() {
    if (this.usrSwimtime >= 45) {
      this.fsService.addSwimtime(this.getSwimtime());
    } else {
      console.error("Swimtime needs to be generated!");
    }
  }

  retrieveSwimtimes() {
    this.fsService.readSwimtimes().subscribe(data => {
      let records = data.map(e => {
        return {
          //Id: e.payload.doc.id,
          email: e.payload.doc.data()['email'],
          swimtime: e.payload.doc.data()['swimtime']
        }
      });
      this.existingSwimtimes = this.sortRecords(records);
      console.log(this.existingSwimtimes);
      //this.results = this.existingSwimtimes;
    });
  }

  sortRecords(swimtimes) {
    const x = _.sortBy(swimtimes, ['swimtime']);
    return x;
  }

  logSwimtimes(){
    //console.log(this.existingSwimtimes);
    let item = this.existingSwimtimes[0];
    console.log(item)
    this.results.push(item);
    this.results = [...this.results];
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
