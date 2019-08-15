import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab1Page } from './tab1.page';
import { GoogleMapComponent} from '../../components/google-map/google-map.component'; /** Importieren des Google Map Components */

const routes: Routes = [
  {
    path: '',
    component: Tab1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab1Page, GoogleMapComponent] /** Deklarieren des Google Map Components */
})
export class Tab1PageModule {}
