import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  word: string = 'TEST';

  getWord() {
    // return this.word;
    return this.http.get('/assets/word.json');
  }

  constructor(
    private http: HttpClient
  ) { }
}
