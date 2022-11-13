import { TestBed } from '@angular/core/testing';

import { TextspeechService } from './textspeech.service';

describe('TextspeechService', () => {
  let service: TextspeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextspeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
