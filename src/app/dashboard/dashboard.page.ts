import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usrEmail: string;

  constructor(
    private navController: NavController,
    private authService: AuthenticationService
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
    return this.generateSwimtime(46, 58, 2);    
  }

  sync() {

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
