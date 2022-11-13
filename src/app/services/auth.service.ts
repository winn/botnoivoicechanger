import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';
import { GlobalFunctionService } from './global-function.service';
import { liff_id } from 'src/environments/environment';
import { getDecodedIDToken } from '@liff/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  liffUser: any;
  
  constructor(
    private router: Router, 
    private _gfunc: GlobalFunctionService
  ) {}

  async lineLogin() {
    await liff
      .init({
        liffId: liff_id,
        withLoginOnExternalBrowser: true,
      })
      .catch((err) => {
        console.log('Detected liff caches');
        console.log('Clearing liff data caches... ');
        this._gfunc.removeLocalStorageByValue('LIFF_STORE');
        liff.logout();
      });
    if (liff.isLoggedIn()) {
      this.liffUser = liff.getDecodedIDToken;
      return this.router.navigate(['/']);
    }
  }

  getLiffUser() {
    return this.liffUser;
  }

  setToken(token: any) {
    sessionStorage.setItem('token', token);
    this.router.navigate(['/main']);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
}
