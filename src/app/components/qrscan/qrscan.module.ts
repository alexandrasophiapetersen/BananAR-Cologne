import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { QrscanComponent} from './qrscan.component';


@NgModule({
  declarations: [
    QrscanComponent,
  
  ],

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

  ],

  exports: [
    QrscanComponent]
})
export class QrScanModule {}