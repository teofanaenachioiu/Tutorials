import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alertController: AlertController, private router: Router) {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Items list',
      subHeader: 'Your items list',
      message: 'This is an alert message. Ignore it :)',
      buttons: [{
        text: 'OK', handler: () => {
          this.router.navigate(['/items']);
        }
      }]
    });

    await alert.present();
  }

  loginUser() {
    this.router.navigate(['/auth']);
  }
}
