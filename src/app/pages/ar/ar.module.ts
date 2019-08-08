import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArPage } from './ar.page';
import { QrScanModule } from 'src/app/components/qrscan/qrscan.module';

const routes: Routes = [
  {
    path: '',
    component: ArPage
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
  declarations: [ArPage]
})
export class ArPageModule {}
