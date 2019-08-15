import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ElementRef,
  Inject,
  Renderer
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { IfStmt } from '@angular/compiler';
import { JsonDataService } from '../../json-data.service';
import { DetailsPage } from '../../pages/details/details.page';
const { Geolocation, Network } = Plugins;
declare var google;

/** Google Maps wurde mit folgendem Tutorial implementiert: "https://www.joshmorony.com/building-mobile-apps-with-ionic-2/?utm_source=sidebar&utm_medium=text&utm_campaign=prbawi" */
/**  Die Marker wurden mit folgendem Tutorial implementiert:"https://edupala.com/how-to-add-google-map-in-ionic-4/" (reine Orientierung, keine Kopierung des Codes) und anschließend weiter modifziert*/
@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent {
  @Input('apiKey') apiKey: string; /** API Key als Input */

  public map: any; /** Referenz zu Google Map */
  public marker: any; /** Referenz zu den Markern */
  public firstLoadFailed: boolean = false; /** Gibt an, ob der erste Versuch die Map zu laden gefailt ist. */
  private mapsLoaded: boolean = false; /** Um zu sehen, ob die Map geladen hat oder nicht. */
  private networkHandler = null; /** Gibt den Online/Offline Status an */
  public connectionAvailable = true; /** Zeigt an ob eine Internetverbindung vorhanden ist. */
  datenData = [];

  constructor(
    private renderer: Renderer2 /** enthält Funktionen um DOM zu modifzieren */,
    private element: ElementRef /** gibt Zugang zu dem DOM dieses Components  */,
    private platform: Platform,
    private datenService: JsonDataService,
    @Inject(DOCUMENT) private _document
  ) {
    /** Injizieren des API Keys in den DOM */

    fetch('../../../assets/data/data.json')
      .then(res => res.json()) /** Daten werden geholt */
      .then(data => {
        this.datenData =
          data.jsondata; /** Data wird in Array datenData gespeichert. */
        this.datenService.setJsondata(this.datenData);
        console.log(data);
      });
  }

  public init(): Promise<any> {
    /** Initialisieren der Map. */
    return new Promise((resolve, reject) => {
      if (typeof google == 'undefined') {
        /** Wenn Google noch nicht definiert ist, wird die SDK injiziert. */

        this.loadSDK().then(
          res => {
            /**  Laden der SDK und Methoden, basierend auf dem aktuellen Verbindungsstatus (Internetverbindung) */

            this.initMap().then(
              res => {
                /** Wenn die SDK fertig geladen hat. */
                this.enableMap();
                resolve(true);
              },
              err => {
                this.disableMap();
                reject(err);
              }
            );
          },
          err => {
            this.firstLoadFailed = true; /** Bei erfolglosem Laden --> boolean true */
            reject(err);
          }
        );
      } else {
        reject('Google maps already initialised');
      }
    });
  }

  private loadSDK(): Promise<any> {
    console.log('Loading Google Maps SDK');
    this.addConnectivityListeners(); /** aktueller Internetstatus */

    return new Promise((resolve, reject) => {
      if (!this.mapsLoaded) {
        Network.getStatus()
          .then(
            status => {
              if (status.connected) {
                /** Wenn Internetverbindung aktiv  */

                this.injectSDK().then(
                  res => {
                    /** injizieren der SDK */
                    resolve(true);
                  },
                  err => {
                    reject(err);
                  }
                );
              } else {
                reject('Not online');
              }
            },
            err => {
              if (navigator.onLine) {
                /** 2x da as Capacitor Plugin "Network" nur auf Android und iOS und nicht im Browser funktioniert.  */
                this.injectSDK().then(
                  res => {
                    resolve(true);
                  },
                  err => {
                    reject(err);
                  }
                );
              } else {
                reject('Not online');
              }
            }
          )
          .catch(err => {
            console.warn(err);
          });
      } else {
        reject('SDK already loaded');
      }
    });
  }

  private injectSDK(): Promise<any> {
    /** Google API/SDK-KEY */
    return new Promise((resolve, reject) => {
      window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
      };

      const script = this.renderer.createElement('script');
      script.id = 'googleMaps'; /** Script-Element mit der Google SDK API*/
      if (this.apiKey) {
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=' +
          this.apiKey +
          '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      this.renderer.appendChild(
        this._document.body,
        script
      ); /** anfügen an document.body */
    });
  }

  private initMap(): Promise<any> {
    /** Wird aufgerufen, wenn die SDK fertig geladen hat. */
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      }).then(
        position => {
          /** aktuelle Location des Users mit Capacitor Plugin */

          console.log(position);

          const latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          const mapOptions = {
            center: latLng /** aktuelle Position als center der Map */,
            zoom: 15
          };

          this.map = new google.maps.Map(
            this.element.nativeElement,
            mapOptions
          ); /** create Google Maps mit zuvor definierten Optionen */

          resolve(true);
        },
        err => {
          console.log(err);
          reject('Could not initialise map');
        }
      );
    });
  }

  disableMap(): void {
    this.connectionAvailable = false; /** Für das Styling der Map abhängig vom Status der Internetverbindung */
  }

  enableMap(): void {
    this.connectionAvailable = true; /** Für das Styling der Map abhängig vom Status der Internetverbindung */
  }

  addConnectivityListeners(): void {
    /** Wenn der aktuelle Verbindungsstatus geändert wird, wird automatisch die SDK injiziert. */

    console.warn(
      'The Capacitor Network API does not currently have a web implementation.'
    );

    if (this.platform.is('cordova')) {
      this.networkHandler = Network.addListener(
        'networkStatusChange',
        status => {
          if (status.connected) {
            if (typeof google == 'undefined' && this.firstLoadFailed) {
              this.init().then(
                res => {
                  /** Wenn der User online ist, google jedoch noch undefiniert, wird die init-Funktion erneut aufgerufen. */
                  console.log('Google Maps ready.');
                },
                err => {
                  console.log(err);
                }
              );
            } else {
              this.enableMap();
            }
          } else {
            this.disableMap(); /** Wenn der User offline ist, wird die Map deaktiviert*/
          }
        }
      );
    }
  }

  public changeMarker(lat: number, lng: number): void {
    /** Wenn der "Location-Button" gedrückt wird, wird der Marker der aktuellen Location auf der Karte gesetzt.*/

    const latLng = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }

  public getMarkers() {
    /** Lädt die Koordinaten der Murals der Datenbank und fügt diese zu der Map hinzu */
    this.datenData = this.datenService.getJsondata();
    for (let i = 0; i < this.datenData.length; i++) {
      if (i >= 0) {
        this.addMarkersToMap(this.datenData[i]);
        console.log(i);
      }
    }
  }

  addMarkersToMap(daten) {
    /** Fügt die Marker der Koordinaten der Datenbank zu der Map hinzu. */
    const position = new google.maps.LatLng(
      daten.location.latitude,
      daten.location.longitude
    );
    const icon = {
      url: '../../../assets/icon/LogoMakr_4zyT32 (1).svg',
      scaledSize: new google.maps.Size(45, 45)
    };
    const contentString =
      '<div id="content"><p>' +
      daten.title +
      '</p><p>' +
      daten.location.street +
      '</p></div>';
    const infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      icon: icon
    }); /** erzeugt Marker */

    marker.addListener('click', function() {
      /** Durch Klick auf den Marker öffnet sich ein Info-Fenster, welches den Namen und die Adresse des Murals angibt. */
      infoWindow.open(this.map, marker);
    });
    this.marker = marker;
  }
}
