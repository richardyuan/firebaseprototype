import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FirestoredbService } from '../services/firestoredb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usrEmail: string;
  swimtime: number = 0;
  
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
    this.swimtime = this.generateSwimtime(46, 58, 2); 
    console.log(this.swimtime);   
  }

  sync() {
    if (this.swimtime >= 0){
      this.fsService.addSwimtime(this.swimtime);
    } else {
      console.error("Swimtime needs to be generated!");
    }
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
