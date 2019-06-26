import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private navController: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'An e-mail is required...' },
      { type: 'pattern', message: 'Please enter a valid email...' }
    ],
    'password': [
      { type: 'required', message: 'A password is required...' },
      { type: 'minlength', message: 'Password must be at least 8 characters long...' }
    ]
  };
 
  loginUser(val){
    this.authService.loginUser(val)
    .then(res => {
      console.log(res);
      console.log(firebase.auth().currentUser.getIdTokenResult());
      this.navController.navigateForward('/dashboard');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  goToRegisterPage(){
    this.navController.navigateForward('/register');
  }

}
