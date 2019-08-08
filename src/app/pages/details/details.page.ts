import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { JsonDataService } from '../../json-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
datenData = [];

  constructor(
    private router: Router,
    private datenService: JsonDataService

  ){fetch('../../../assets/data/data.json').then(res => res.json()).then(data => {
      this.datenData = data.jsondata;
      this.datenService.setJsondata(this.datenData);
    });
  }

  getDatenDetails(daten) {
    this.datenService.setDaten(daten);
    this.router.navigate(['/tabs/tab1/details/json-detail']);
  }
}
