import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { webapi } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TextspeechService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getHeader() {
    const tokenString = this.authService.getToken();
    const token = "Bearer " + tokenString
    const header = new HttpHeaders({
      "Authorization": token,
    })
    return header
  }

  checkToken() {
    const header = this.getHeader()
    const url = webapi + '/service/get_token';
    return this.http.post(url, {}, { headers: header })
  }
  
}
