import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from '../app/pages/tabs/tabs.page';
import { TabsPageModule } from './pages/tabs/tabs.module';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' }, /** Tabs als Startseite */
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TabsPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
