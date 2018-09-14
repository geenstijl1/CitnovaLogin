import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 

@IonicPage()
@Component({
  selector: 'page-infra',
  templateUrl: 'infra.html',
})
export class InfraPage {
  private token = {tk : localStorage.getItem('token')}
  private url = 'http://localhost:3000/api/v1/complain/4';
  content:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }
  ionViewDidLoad() {
    this.http.get<any>(this.url, {headers : {'Authorization': 'Bearer ' + this.token.tk}})
    .subscribe( res => {
      this.content = res;                                                                                                                             });
      console.log(this.content);
  }
}
