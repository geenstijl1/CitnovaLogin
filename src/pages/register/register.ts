import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;

  private url = "http://localhost:3000/api/v1/sign_up";

  newUser = [
    {"user":
      {"email": "",
        "password": "",
        "password_confirmation": "",
        "username": ""
    }
    }
  ]
  constructor(private nav: NavController, private auth: AuthService,
              private alertCtrl: AlertController, private http: HttpClient) { }

              registrar(){
                this.http.post(this.url, this.newUser[0])
                .subscribe(res => {
                  if (JSON.stringify(res).includes('Account created')) {
                    alert('Account created');
                    this.nav.push('LoginPage');
                  }else {
                    alert("Invalid email address or password");
                  }
                });
              }

              public register() {
                this.auth.register(this.newUser).subscribe(success => {
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
