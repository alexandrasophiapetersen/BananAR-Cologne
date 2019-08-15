import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { GoogleMapComponent } from '../../components/google-map/google-map.component';
import { JsonDataService } from '../../json-data.service';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(GoogleMapComponent)
  map: GoogleMapComponent; /** Um Funktionen des Google Map Components aufrufen zu können. */

  private latitude: number;
  private longitude: number;
  datenData = [];

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private datenService: JsonDataService
  ) {}

  ngOnInit() {
    this.datenData = this.datenService.getJsondata();
    this.map.init().then(
      res => {
        /** Funktion des GoogleMaps Components wird nach Laden der Seite aufgerufen */
        this.map.getMarkers(); /** Funktion um  Daten der Marker zu holen und auszugeben */
        console.log('map ready!');
      },
      err => {
        console.log(err);
      }
    );
  }

  setLocation(): void {
    /** Aktuelle Location des Users */
    this.loadingCtrl
      .create({
        message: 'setting current location...'
      })
      .then(overlay => {
        overlay.present();

        Geolocation.getCurrentPosition().then(
          position => {
            overlay.dismiss();

            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.map.changeMarker(this.latitude, this.longitude);
          },
          err => {
            console.log(err);
            overlay.dismiss();
          }
        );
      });
  }
}
