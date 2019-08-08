import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {QrScanModule } from 'src/app/components/qrscan/qrscan.module';

import { IonicModule } from '@ionic/angular';

import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    QrScanModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
