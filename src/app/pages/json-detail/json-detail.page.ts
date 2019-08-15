import { Component, OnInit } from '@angular/core';
import { Daten } from 'src/app/models/json';
import { Plugins, AppState } from '@capacitor/core';
import { JsonDataService } from 'src/app/json-data.service';
const { Browser } = Plugins;

@Component({
  selector: 'app-json-detail',
  templateUrl: './json-detail.page.html',
  styleUrls: ['./json-detail.page.scss']
})
export class JsonDetailPage implements OnInit {
  daten = {} as Daten;

  constructor(private datenService: JsonDataService) {}

  ngOnInit() {
    this.daten = this.datenService.getDaten();
  }
  async open() {
    await Browser.open({
      url: this.daten.artist.website
    }); /** Ermöglicht Öffnen der Website im Browser. */
  }
}
