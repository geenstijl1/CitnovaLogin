import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;

  private url = 'http://localhost:3000/api/v1/sign_in';

  userLogin = [
    {"auth":
      {"email": "",
        "password": ""
    }
    }
  ]

  constructor(private nav: NavController, private http: HttpClient) { }

  public createAccount() {
    this.nav.push('RegisterPage');
  }
  ionViewDidLoad() {
  }

  inicioSesion() {
    this.http.post(this.url, this.userLogin[0])
    .subscribe(res => {
      console.log(res[1].username);
      if (res[0].msg == 'Invalid email address or password') {
        alert(res[0].msg)
      }else {
        localStorage.setItem('username', res[1].username);
        localStorage.setItem('token', res[0]);
        switch(res[1].username) {
          case 'innovacion':
            this.nav.push('InnovationPage');
            break;
          case 'gestiont':
            this.nav.push('TalentPage');
            break;
          case 'difusiond':
            this.nav.push('DifusionPage');
            break;
          case 'desarcyt':
            this.nav.push('DcientPage');
            break;
          case 'infrascyt':
            this.nav.push('InfraPage');
            break;
          default:
            this.nav.push('MainMenuPage');
            break;
        }
      }
    });
  }

}

