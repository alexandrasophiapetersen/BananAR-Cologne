import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'

})
export class AppComponent {
  constructor(
  ) {
  SplashScreen.hide().catch((err) => { 
     /** Cordova SplashScreen und Statusbar werden versteckt,
      *  und nicht verwendet. */
    console.warn(err);
  });

  StatusBar.hide().catch((err) => {
    console.warn(err);
  });
}
}
