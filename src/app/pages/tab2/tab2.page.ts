import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { Plugins } from '@capacitor/core';
import { JsonDataService } from '../../json-data.service';
import { DetailsPage} from '../../pages/details/details.page';
import { DOCUMENT } from '@angular/common';
import {QrscanComponent} from '../../components/qrscan/qrscan.component';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  datenData = [];


  constructor( private datenService: JsonDataService,
    @Inject(DOCUMENT) private _document) { 
      fetch('../../../assets/data/data.json').then(res => res.json())
      .then(data => {
        this.datenData = data.jsondata;
        this.datenService.setJsondata(this.datenData);
        console.log(data);
      });
    }

  ngOnInit() {
  }
}
