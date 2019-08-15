import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

/** Damit das Routing funktioniert muss das RouterModule importiert werden. Tabs ist der Haupt-Pfad der Application.
 * Von ihm aus, gehen alle anderen Pfade und Seiten aus (siehe children). 
 * Die App ist aufgeteilt in die Seiten Tab 1 (Google Maps), Tab2 (QRScanner),
 * Detailseite mit der Liste aller Murals, die Detailseite aller einzelnen Murals
 * und der AR-Seite mit dem QRScanner und der anschließenden Camera Preview. */

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {path: 'tab1',
      loadChildren: '../tab1/tab1.module#Tab1PageModule' /** Google Maps */
    },
      {
      path: 'tab2',
      loadChildren: '../tab2/tab2.module#Tab2PageModule' /** QR Scanner Startseite */
    },
    { path: 'tab1/details',
    loadChildren: '../details/details.module#DetailsPageModule' /** Liste aller Murals */
  },
  { path: 'tab1/details/json-detail',
    loadChildren: '../json-detail/json-detail.module#JsonDetailPageModule' /** Detailseite einzelner Murals */
  },
  { path: 'tab2/ar',
    loadChildren: '../ar/ar.module#ArPageModule' /** QR Scan mit anschließender Camera Preview inkl. Overlays  */
  },
  { path: 'tab2/ar/ar-detail',
    loadChildren: '../ar-detail/ar-detail.module#ArDetailPageModule' /** QR Scan mit anschließender Camera Preview inkl. Overlays  */
  },
    ]
  },
  {
  path: '',
  redirectTo: '/tabs/tab1',
  pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [TabsPage]
})
export class TabsPageModule {}

