import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TextspeechService } from '../services/textspeech.service';

@Component({
  selector: 'app-line-login',
  templateUrl: './line-login.component.html',
  styleUrls: ['./line-login.component.css'],
})
export class LineLoginComponent implements OnInit {

  user = {
    "iss": "https://access.line.me",
    "sub": "U9e2f277a8c6ff6d7e88b2b023fcbe274",
    "aud": "1656100492",
    "exp": 1668368413,
    "iat": 1668364813,
    "amr": [
        "linesso"
    ],
    "name": "Pitcha",
    "picture": "https://profile.line-scdn.net/0hYgbZtJWRBkhfIxKrDDF5H2NmCCUoDQAAJxFPLHwgWX90GhRNahIeK39zXyh3FxYca0dLJigiW3En",
    "email": "pitcha_2149@hotmail.com"
}

  constructor(
    private _tts: TextspeechService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void { }

  lineSignIn(){
    // this._auth.lineLogin();
    this.getToken();
  }

  getToken() {
    // const user = this._auth.getLiffUser;
    this._tts.liff(this.user).subscribe((res: any) => {
      if (res.status == 200) {
        const token: string = res.response.jwt;
        this._auth.setToken(token);
      }
    });
  }
}
