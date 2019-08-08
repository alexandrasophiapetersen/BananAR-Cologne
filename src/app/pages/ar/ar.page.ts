import { Plugins } from '@capacitor/core';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { JsonDataService } from '../../json-data.service';
import { DOCUMENT } from '@angular/common';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';

import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-ar',
  templateUrl: './ar.page.html',
  styleUrls: ['./ar.page.scss'],
})
export class ArPage implements OnInit {

  datenData = [];
  selectedProduct: any;
productFound = false;


  constructor(
    private barcodeScanner: BarcodeScanner,
    private datenService: JsonDataService,
    private toast: Toast,
    private router: Router,
    public navCtrl: NavController, private cameraPreview: CameraPreview, private platform: Platform,
    @Inject(DOCUMENT) private _document) {
      fetch('../../../assets/data/data.json').then(res => res.json())
      .then(data => {
        this.datenData = data.jsondata;
        this.datenService.setJsondata(this.datenData);
        console.log(data);
      });
    }
  ngOnInit() {
this.qrscan();
  }

  qrscan() {
    this.datenData = this.datenService.getJsondata();
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.datenData.find(daten => daten.qrcode === barcodeData.text);
      if (this.selectedProduct !== undefined) {
        this.productFound = true;
        this.camerapreview();
      } else {
        this.productFound = false;
        this.router.navigate(['/tabs/tab2']);
        this.toast.show(`Product not found`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
          this.router.navigate(['/tabs/tab2']);
        }
      );
    });
  }

  camerapreview() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      width: window.screen.width,
      height: window.screen.height,
      previewDrag: true,
      toBack: true,
      alpha: 1,
      x: 0,
      y: 0,
      camera: 'rear',
    }
    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts);
  }

}
