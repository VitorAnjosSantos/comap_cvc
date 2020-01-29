import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { NavController} from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 count: any;

  constructor(private navCtrl: NavController) {
    this.count= [{auto: 0}];
  }
  
  contador(){
    for(let i = 0; i >= 0; i++){
      this.count = [{auto: i}];
    
  }

  }

  
}

