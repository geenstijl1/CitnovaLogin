import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  //username = '';
  //email = '';
  username = localStorage.getItem("correo");
  email = localStorage.getItem("contra");

  constructor(private nav: NavController, private auth: AuthService) {
    //let info = this.auth.getUserInfo();
    //this.username = info['name'];
    //this.email = info['email'];
  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

  cerrar(){
    localStorage.removeItem("correo");
    localStorage.removeItem("contra");
    this.nav.push(LoginPage);
  }
}