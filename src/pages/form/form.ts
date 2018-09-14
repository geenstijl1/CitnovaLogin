import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import {Headers} from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  private token = {
    tk : localStorage.getItem('token')
  }
  private areaId = localStorage.getItem('currentAreaId');
  private url = "http://localhost:3000/api/v1/complain/create";

  newComplain  = [
    {"complain": {
      "body" : "",
      "area_id": this.areaId
    }
    }
  ]
  head= {
    headers: new HttpHeaders ({"Content-Type": "application/json", "Authorization": "Bearer " + this.token.tk})
  };

  constructor(public nav: NavController, public navParams: NavParams, public http: HttpClient) {}

  enviarQueja() {
    this.http.post(this.url, this.newComplain[0], this.head)
    .subscribe(res => {
      alert(res[0].msg) 
      this.nav.push('MainMenuPage');
    });
  }
}
