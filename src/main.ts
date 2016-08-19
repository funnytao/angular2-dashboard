import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { GlobalService } from './app/shared/global.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  GlobalService,
  APP_ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  // Initialize Firebase app
  defaultFirebase({
    apiKey: "AIzaSyA9SmCL17w3uUQDED945uMXp0L7VUROlOE",
    authDomain: "angular-dashboard.firebaseapp.com",
    databaseURL: "https://angular-dashboard.firebaseio.com",
    storageBucket: "angular-dashboard.appspot.com",
  })
])
.catch(err => console.error(err));
