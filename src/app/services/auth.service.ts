import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';
import { GlobalFunctionService } from './global-function.service';
import { liff_id } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
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
      return liff.getDecodedIDToken();
    }
  }

  setToken(token: any) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem("token");
  }
}
