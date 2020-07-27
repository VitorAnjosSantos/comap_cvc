import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarPageRoutingModule } from './finalizar-routing.module';
import { Tab1Page } from '../tab1/tab1.page';
import { FinalizarPage } from './finalizar.page';
import { TabletPage } from '../tablet/tablet.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarPageRoutingModule,
    Tab1Page
  ],

  entryComponents: [TabletPage]
})
export class FinalizarPageModule {}
