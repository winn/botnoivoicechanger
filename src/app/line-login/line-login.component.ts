import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TextspeechService } from '../services/textspeech.service';

@Component({
  selector: 'app-line-login',
  templateUrl: './line-login.component.html',
  styleUrls: ['./line-login.component.css'],
})
export class LineLoginComponent implements OnInit {

  token: any;
  isLoggedIn: any;
  credentials: any;

  constructor(
    private _tts: TextspeechService,
    private _auth: AuthService
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void { }

  lineSignIn(){
    this.token = this._auth.lineLogin();
    if(this.token) {
      this.isLoggedIn = true;
      this._auth.setToken(this.token);
      this._tts.checkToken().subscribe((res: any) => {
        if (res.status == 200) {
          const token: string = res.data[0].token;
          this.credentials = token.replace('Bearer ', '');
        }
      });
    }
  }
}
