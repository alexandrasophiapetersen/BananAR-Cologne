import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; /** Import zur Ausgabe von gespeicherten lokalen Daten */
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage'; /** Import zum Speicher von lokalen Daten */
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'; 
/** Import des Cordova Plugins BarCodeScanner, um Scan des QR-Codes möglich zu machen. */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsPage } from './pages/tabs/tabs.page'; /** importieren des Hauptpfades/der Startseite */
import { Toast } from '@ionic-native/toast/ngx'; /** Import des Toast Plugins zum Ausgeben von Alerts/Meldungen */
import { CameraPreview } from '@ionic-native/camera-preview/ngx'; /** Import des Cordova Plugins Camera Preview, */
 /** um eine Kameravorschau mit HTML Elementen möglich zu machen */

@NgModule({
  declarations: [AppComponent],
  entryComponents: [TabsPage],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner, Toast, CameraPreview
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
