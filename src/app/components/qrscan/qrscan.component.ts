import { Component, OnInit, Inject,ViewEncapsulation } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { JsonDataService } from '../../json-data.service';
import { DetailsPage} from '../../pages/details/details.page';
import { DOCUMENT } from '@angular/common';
import { Toast } from '@ionic-native/toast/ngx';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class QrscanComponent {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private datenService: JsonDataService,
    private toast: Toast,
    private router: Router,) { 

  }

  ArPage() {

    this.router.navigate(['/tabs/tab2/ar']);
  }

}