import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FirestoredbService } from '../services/firestoredb.service';
import * as _ from 'lodash';
import { accessdata } from '../services/accessdata.service';

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
    private fsService: FirestoredbService,
    private dataService: accessdata
  ) { }

  ngOnInit() {
    if (this.authService.userDetails()) {
      this.dataService.usrEmail = this.authService.userDetails().email;
    } else {
      this.navController.navigateBack('');
    }
  }

  /**
   * Generates record with logged in email and random swimtime using authService
   */
  sync() {
    const data = this.dataService.generateRecord();
    this.fsService.addSwimtime(data);
  }

  /**
   * Retrieves swimtimes from Cloud Firestore
   */
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

  /**
   * Sorts records by swimtime low to high (lodash)
   * @param records list of records
   */
  sortRecords(records) {
    return _.sortBy(records, ['value']);
  }

  /**
   * Uses array destructuring to refresh and visualise the graph
   */
  visualiseSwimtimes(){
    this.results = [...this.existingSwimtimes]; 
    console.log(this.results);
  }

  /**
   * Logs out using the Firestore authService for total deletion of user credentials e.g. Access tokens
   */
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
