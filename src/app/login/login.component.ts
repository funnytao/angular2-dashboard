import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { GlobalService } from '../shared/global.service';

@Component({
  moduleId: module.id,
  // selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  error = [];
  regerror = [];
  reg = false;
  logUser: Object = {
    log_email: '',
    log_password: ''
  };
  regUser: Object = {
    email: '',
    username: '',
    password: '',
    repassword: ''
  };

  constructor(public af: AngularFire, private router:Router, private globalService: GlobalService) {
    if (localStorage.getItem('uid')==null) {
      this.router.navigate(['/page']);
    }
  }

  regFormValid() {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    this.regerror = [];
    if (this.regUser['email']=='') {
      this.regerror.push('Please enter your email.');
    }
    else if (!re.test(this.regUser['email'])) {
      this.regerror.push('Please enter a valid email.');
    }
    if (this.regUser['username']=='') {
      this.regerror.push('Please enter your username');
    }
    if (this.regUser['password']=='') {
      this.regerror.push('Please enter your password.');
    }
    else if (this.regUser['password'].length>16 || this.regUser['password'].length<8) {
      this.regerror.push('You password should have 8-16 characters.');
    }
    if (this.regUser['repassword']!=this.regUser['password']) {
      this.regerror.push("You password don't match.");
    }
  }

  login() {
    this.af.auth.login({
      email: this.logUser['log_email'],
      password: this.logUser['log_password']
    }, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
      .then((auth) => {
        console.log(auth.uid);
        this.error = [];
        localStorage.setItem('uid', auth.uid);
        this.router.navigate(['/page']);
    }).catch((error) => {
      this.error = [];
      this.error.push(error.message);
    });
  }

  googleLogin(credentials) {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    })
      .then((auth) => {
        console.log(auth.uid);
        this.error = [];
        localStorage.setItem('uid', auth.uid);
        this.router.navigate(['/page']);
    }).catch((error) => {
      this.error = [];
      this.error.push(error.message);
    });
  }

  register() {
    this.reg = !this.reg;
  }

  loginValid() {
    this.error = [];
  }

  registerValid() {
    this.af.auth.createUser({
      email: this.regUser['email'],
      password: this.regUser['password']
    })
      .then((auth) => {
        this.af.database.object('private/'+auth.uid).set({
          username: this.regUser['username']
        });
        this.error = [];
        localStorage.setItem('uid', auth.uid);
        this.router.navigate(['/page']);
    }).catch((error) => {
      this.regerror = [];
      this.regerror.push(error);
    });
  }
}
