import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { TextspeechService } from '../services/textspeech.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  myText: any;
  voiceId: any;
  token: any;

  constructor(
    public voiceRecognitionService: VoiceRecognitionService,
    private _tts: TextspeechService
  ) {
    this.voiceRecognitionService.init()
  }

  ngOnInit(): void {
    this._tts.checkToken().subscribe((res: any) => {
      if (res.status == 200) {
        const token: string = res.data[0].token;
        this.token = token.replace('Bearer ', '');
      }
    });
  }

  async testvoice() {
    this.myText = (<HTMLInputElement>document.getElementById("myText")).value;
    this.voiceId = (<HTMLInputElement>document.getElementById("voicelist")).value;
    this.token = (<HTMLInputElement>document.getElementById("token")).value;
   
    // Api: https://voice.botnoi.ai/api/service/generate_audio
    // Staging Api: https://staging-text2speech.botnoi.ai/api/service/generate_audio
    const response = await fetch("https://staging-text2speech.botnoi.ai/api/service/generate_audio", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Botnoi-Token': this.token
      },
      body: JSON.stringify({ "text": this.myText, "speaker": this.voiceId, "volume": 1, "speed": 1, "type_media": "m4a" }),
    })
    
    response.json().then(data => {
      console.log(data.audio_url);
      (<HTMLInputElement>document.getElementById('displayvoice')).src = data.audio_url;
    })
  }
  
  startButton() {
    this.voiceRecognitionService.start()
  }

  stopButton() {
    this.voiceRecognitionService.stop()
    this.testvoice()
  }

}
