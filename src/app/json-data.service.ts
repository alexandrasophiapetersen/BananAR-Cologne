import { Injectable } from '@angular/core';
import { Daten } from './models/json'; /** definiert den Aufbau der data.json */

/** Hier wurde das Tutorial "https://edupala.com/how-to-add-google-map-in-ionic-4/" zu Rate gezogen und verwendet. */

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  jsondata: []; /** hier werden die Daten der lokalen json.data gespeichert um diese auf anderen Seiten wiederzuverwenden. */
  daten: Daten; /** Aufbau der data.json */

  constructor() { }

  setJsondata(data) {
    this.jsondata = data; /** Daten an Array übergeben */
    console.log(data);
  }

  getJsondata() {
    return this.jsondata; /** Daten ausgeben */
  }

  setDaten(data) {
    this.daten = data; 
    console.log(data);
  }

  getDaten() {
    return this.daten; 
  }
}
