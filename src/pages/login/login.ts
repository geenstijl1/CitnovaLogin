import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { 
    email: '', 
    password: '', 
    nick: '' 
  };

  constructor(private nav: NavController, private auth: AuthService, private alert: AlertController, private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    this.nav.push('RegisterPage');
  }
 
  inicioSesion(){
    if(this.registerCredentials.email == localStorage.getItem("correo")){
      if(this.registerCredentials.password == localStorage.getItem("contra")){
          this.nav.push('MainMenuPage');
      }else{
        alert("Contrasenia Incorrecta");
      }
    }else{
      alert("Correo Incorrecto");
    }

    /*if (this.registerCredentials.email == 'admin') {
      this.nav.push('');
    }*/
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.nav.setRoot('HomePage');
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alert.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
  }
}
