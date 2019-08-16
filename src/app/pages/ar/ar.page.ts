import { Plugins } from '@capacitor/core';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { JsonDataService } from '../../json-data.service';
import { DOCUMENT } from '@angular/common';
import { Toast } from '@ionic-native/toast/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import {
  CameraPreview,
  CameraPreviewOptions
} from '@ionic-native/camera-preview/ngx';
import { Platform } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
const { Browser } = Plugins;

/** Verwendet wurde folgendes Tutorial: https://www.djamware.com/post/59bb219f80aca768e4d2b13e/example-of-ionic-3-angular-4-cordova-barcode-and-qr-code-scanner */

@Component({
  selector: 'app-ar',
  templateUrl: './ar.page.html',
  styleUrls: ['./ar.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArPage implements OnInit {
  datenData = [];
  selectedProduct: any;
  productFound = false; /** Wenn boolean = true, werden die Daten in der HTML Seite ausggeben. */

  constructor(
    private barcodeScanner: BarcodeScanner,
    private datenService: JsonDataService,
    private toast: Toast,
    private router: Router,
    public modalController: ModalController,
    public navCtrl: NavController,
    private cameraPreview: CameraPreview,
    private platform: Platform,
    // tslint:disable-next-line: variable-name
    @Inject(DOCUMENT) private _document
  ) {
    /** Lade und hole Daten von data.json */
    fetch('../../../assets/data/data.json')
      .then(res => res.json())
      .then(data => {
        this.datenData = data.jsondata;
        this.datenService.setJsondata(this.datenData);
        console.log(data);
      });
  }
  ngOnInit() {
    this.qrscan(); /** Nach Laden der Seite wird der Barcode Scanner des Cordova Plugins aktiviert. */
  }

  qrscan() {
    this.datenData = this.datenService.getJsondata();
    this.selectedProduct = {};
    this.barcodeScanner.scan().then(
      barcodeData => {
        // tslint:disable-next-line: max-line-length
        this.selectedProduct = this.datenData.find(
          daten => daten.qrcode === barcodeData.text
        ); /** Wenn der Text des QR-Codes mit dem qrcode der Json Datei übereinstimmt, wird productFound auf true gesetzt, die CameraPreview und das Modal geöffnet. */
        if (this.selectedProduct !== undefined) {
          this.productFound = true;
          this.selectedProduct.setJsondata("boolean", true)
          this.camerapreview();
          this.showModal();
        } else {
          // tslint:disable-next-line: max-line-length
          this.productFound = false; /** Stimmt der Text des QR-Codes nicht überein, erscheint eine Fehlermeldung und der User wird zurück zur Startseite des QR-Scanners geleitet. */
          this.router.navigate(['/tabs/tab2']);
          this.toast
            .show(`Product not found`, '5000', 'center')
            .subscribe(toast => {
              console.log(toast);
            });
        }
      },
      err => {
        this.toast.show(err, '5000', 'center').subscribe(toast => {
          console.log(toast);
          this.router.navigate(['/tabs/tab2']);
        });
      }
    );
  }

  camerapreview() {
    /** CameraPreview */
    const cameraPreviewOpts: CameraPreviewOptions = {
      width: window.screen.width,
      height: window.screen.height,
      previewDrag: true,
      toBack: true /** setzt die CameraPreview hinter die HTML-Seite */,
      alpha: 1,
      x: 0,
      y: 0,
      camera: 'rear'
    };
    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts);
  }

  async showModal() {
    /** erzeugt Modal */
    const modal = await this.modalController.create({
      component: ModalPagePage,
      cssClass: 'modal-transparency',
      backdropDismiss: true
    });

    modal.present();
  }

  async open() {
    await Browser.open({
      url: this.selectedProduct.artist.website
    }); /** Ermöglicht Öffnen der Website im Browser des Telefons. */
  }

  Details() {
    /** Ermöglicht Weitergabe der Daten in selectedProduct auf die Detailseite. */
    const navigationExtras: NavigationExtras = {
      state: {
        selectedProduct: this.selectedProduct
      }
    };
    this.router.navigate(['/tabs/tab2/ar/ar-detail'], navigationExtras);
  }
}
