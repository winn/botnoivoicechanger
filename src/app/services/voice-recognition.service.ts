import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  recognizing: boolean = false;

  public text: any;
  public interim_span: any;

  constructor() { }

  init() {

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'th-TH'

    this.recognition.addEventListener('result', (event: { resultIndex: number; results: string | any[]; }) => {
      var interim_transcript = ''
      var final_transcript = ''
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript
        } else {
          interim_transcript += event.results[i][0].transcript
        }
      }
      this.interim_span = interim_transcript
      this.text = final_transcript
    });

  }

  start() {
    if (this.recognizing) {
      this.recognition.stop()
      return
    }
    this.text = ''
    this.recognition.start()
    this.recognizing = true
    this.interim_span = ''
  }

  stop() {
    if (this.recognizing) {
      this.recognition.stop()
    }
    this.recognition.stop()
    this.recognizing = false

  }

}
