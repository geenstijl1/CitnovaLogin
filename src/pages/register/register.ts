import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
 
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;

  registerCredentials:any = { 
    email: '', 
    password: '', 
    nick: ''
  };

  constructor(private nav: NavController, private auth: AuthService,private alertCtrl: AlertController) { }
 
  registrar(){
    localStorage.setItem("correo", this.registerCredentials.email);
    localStorage.setItem("contra", this.registerCredentials.password);
    localStorage.setItem("nick",   this.registerCredentials.nick);

  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.push('LoginPage');
            }
          }
        }
      ]
    });
    alert.present();
  }
}
