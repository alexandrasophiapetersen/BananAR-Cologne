import { Component, OnInit, Input, Renderer2, ElementRef, Inject, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { IfStmt } from '@angular/compiler';
import { JsonDataService } from '../../json-data.service';
import { DetailsPage} from '../../pages/details/details.page';
const { Geolocation, Network } = Plugins;
declare var google;

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {
  @Input('apiKey') apiKey: string; 

public map: any;
public marker: any;
public firstLoadFailed: boolean = false;
private mapsLoaded: boolean = false;
private networkHandler = null;
public connectionAvailable = true;
datenData = [];

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private platform: Platform,
    private datenService: JsonDataService,
    @Inject(DOCUMENT) private _document) { /** Daten werden geholt */
      fetch('../../../assets/data/data.json').then(res => res.json())
      .then(data => {
        this.datenData = data.jsondata; /** Data wird in Array datenData gespeichert. */
        this.datenService.setJsondata(this.datenData);
        console.log(data);
      });

     }

     public init(): Promise<any> {
      return new Promise ((resolve, reject) => {
        if (typeof(google) == 'undefined'){

          this.loadSDK().then((res) =>{

            this.initMap(). then((res) => { /** Map wird geladen */
              this.enableMap();
              resolve(true);
            }, (err) => {
              this.disableMap();
              reject(err);
            });

          }, (err) => {

            this.firstLoadFailed = true;
            reject(err);
          });

        } else {
          reject('Google maps already initialised');
        }

      });

     }

     private loadSDK(): Promise<any> {
      console.log('Loading Google Maps SDK');
      this.addConnectivityListeners();

      return new Promise((resolve,reject) => {

        if(!this.mapsLoaded) {

          Network.getStatus().then((status) => {

            if(status.connected) {

              this.injectSDK().then((res) => {
                resolve(true);
              }, (err) => {
                reject(err);
              });

            } else {
              reject('Not online');
            }

          }, (err) => {

            if(navigator.onLine){
              this.injectSDK().then((res) => {
                resolve(true);
              }, (err) => {
                reject(err);
              });

            } else {
              reject ('Not online');
            }

          }).catch((err) => { console.warn(err); });

        } else {
          reject ('SDK already loaded');
        }

      });
     }

    private injectSDK(): Promise<any> {  /** Lädt Google SDK-Key und rendert App */
      return new Promise((resolve, reject) => {

        window['mapInit'] = () => {
          this.mapsLoaded = true;
          resolve(true);
        }

        const script = this.renderer.createElement('script');
        script.id = 'googleMaps';
        if(this.apiKey){
          script.src ='https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src ='https://maps.googleapis.com/maps/api/js?callback=mapInit';
        }

        this.renderer.appendChild(this._document.body, script);
      });
    }

    private initMap(): Promise<any> {
      return new Promise((resolve, reject) => {

        Geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 10000}).then((position) => {

          console.log(position);

          const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          const mapOptions = {
            center: latLng,
            zoom: 15
          };

          this.map = new google.maps.Map(this.element.nativeElement, mapOptions);

          resolve(true);
        }, (err) => {
          console.log(err);
          reject('Could not initialise map');
        });
      }); 
    }

    disableMap(): void {
      this.connectionAvailable = false;
    }

    enableMap(): void {
      this.connectionAvailable = true;
    }

    addConnectivityListeners(): void {
      console.warn('The Capacitor Network API does not currently have a web implementation.');

      if (this.platform.is('cordova')) {
        this.networkHandler = Network.addListener('networkStatusChange', (status) => {
          if(status.connected) {
            if(typeof google == 'undefined' && this.firstLoadFailed) {

              this.init().then((res) => {
                console.log('Google Maps ready.')
              }, (err) => {
                console.log(err);
              });

            } else {
              this.enableMap();
            }
          } else {
            this.disableMap();
          }

        });
      }
    }

    public changeMarker(lat: number, lng: number): void {

      const latLng = new google.maps.LatLng(lat, lng);
      const marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.marker = marker;
      this.getMarkers();
    }

    public getMarkers() {
      this.datenData = this.datenService.getJsondata();
      for (let i = 0; i < this.datenData.length; i++) {
        if (i  >= 0) {
          this.addMarkersToMap(this.datenData[i]);
          console.log(i);
        }
      }
    }

    addMarkersToMap(daten) {
      const position = new google.maps.LatLng(daten.location.latitude, daten.location.longitude);
      const icon = {
        url: '../../../assets/icon/LogoMakr_4zyT32 (1).svg',
        scaledSize: new google.maps.Size(45, 45)

      }
      const contentString = '<div id="content"><p>' + daten.title + '</p><p>' + daten.location.street + '</p></div>';
      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      const marker = new google.maps.Marker({ position, map: this.map, icon: icon});

      marker.addListener('click', function(){
        infoWindow.open(this.map, marker);
        });
        this.marker = marker;
    }
}
