import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';

@Component({
  selector: 'app-line-login',
  templateUrl: './line-login.component.html',
  styleUrls: ['./line-login.component.css'],
})
export class LineLoginComponent implements OnInit {

  liff_id = '1656375389-3Low4Q1G';
  userRes: any;
  tokenRes: any;
  user: any;
  jwt: any;
  token: any;
  isLogin!: boolean;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogin = false; 
  }

  async lineLogin() {
    await liff
      .init({
        liffId: this.liff_id,
        withLoginOnExternalBrowser: true,
      })
      .catch((err) => {
        console.log('Detected liff caches');
        console.log('Clearing liff data caches... ');
        localStorage.removeItem('LIFF_STORE');
        liff.logout();
      });
    if (liff.isLoggedIn()) {
      this.isLogin = true;
      this.user = liff.getDecodedIDToken()
      console.log(this.user)
      this.liff();
    }
  }

  async liff() {
    await this.jwt
    this.http
      .post('https://staging-text2speech.botnoi.ai/api/dashboard/liff_changer', this.user)
      .subscribe((res) => {
        this.userRes = res;
        this.jwt = this.userRes.response.jwt;
        console.log(this.jwt);
        this.getToken();
      });
  }

  getToken() {
    this.http
      .post('https://staging-text2speech.botnoi.ai/api/service/get_token', {}, { headers: { Authorization: 'Bearer ' + this.jwt } })
      .subscribe((res) => {
        this.tokenRes = res;
        this.token = this.tokenRes.data[0].token;
        console.log(this.token);
      });
  }
}
