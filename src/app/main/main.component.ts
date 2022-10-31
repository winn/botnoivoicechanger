import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  myText: any;
  voiceId: any;
  token: any;

  constructor(
    public voiceRecognitionService: VoiceRecognitionService
  ) {
    this.voiceRecognitionService.init()
  }

  ngOnInit(): void {}

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
