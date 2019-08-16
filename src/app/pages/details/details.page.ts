import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { JsonDataService } from '../../json-data.service';
import { ArPage } from '../ar/ar.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit{
  datenData = [];
  @ViewChild(ArPage) ar: ArPage;

  constructor(private router: Router, private datenService: JsonDataService) {
    fetch('../../../assets/data/data.json')
      .then(res => res.json())
      .then(data => {
        /** Hole Daten der json.data */
        this.datenData = data.jsondata;
        this.datenService.setJsondata(this.datenData);
      });
  }

  ngOnInit() {
    this.datenData = this.datenService.getJsondata();
  }
  getDatenDetails(daten) {
    this.datenService.setDaten(
      daten
    ); /** Übergabe der Daten an Json-Detail. (Hätte auch durch NavigationExtras gelöst werden können). */
    this.router.navigate([
      '/tabs/tab1/details/json-detail'
    ]); /** Weiterleitung auf Json-Detail. */
  }
}
