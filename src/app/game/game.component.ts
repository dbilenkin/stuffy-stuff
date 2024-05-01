import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  targetWord: any;
  guessState: 'noGuess' | 'incorrect' | 'correct' = 'noGuess';
  enteredWord: string = '';
  lastGuess: string ='';
  lengthMessage: string = '';
  charactersInWordMessage: string = '';
  correctPositionMessage: string = '';

  constructor(
    private gameService: GameService
  ) { }

  onSubmit() {
    if (this.enteredWord.trim() !== '') {
      console.log('Submitted word:', this.enteredWord);
      this.lastGuess = this.enteredWord;
      this.checkGuess();
      this.enteredWord = ''; // Clear the input after submission
    }
  }

  checkGuess() {
    if (this.enteredWord.toLowerCase() === this.targetWord) {
      this.guessState = 'correct';
    } else {
      this.guessState = 'incorrect';

      //word length
      if (this.enteredWord.length === this.targetWord.length) {
        this.lengthMessage = "The guessed word is the same length as the target word!";
      } else if(this.enteredWord.length > this.targetWord.length) {
        this.lengthMessage = "The guessed word is too long.";
      } else {
        this.lengthMessage = "The guessed word is too short.";
      }

      //characters in word
      let wordCopy = this.targetWord;
      let charactersInWord = 0;
      let correctPositions = 0;
      for (let i = 0; i < this.enteredWord.length; i++) {
        const letter = this.enteredWord[i];
        const index = wordCopy.indexOf(letter);
        if (index !== -1) {
          if (letter === this.targetWord[i]) {
            correctPositions++;
          }
          charactersInWord++;
          wordCopy = wordCopy.substring(0, index) + wordCopy.substring(index + 1);
          console.log(wordCopy);
        }
      }
      this.charactersInWordMessage = `${charactersInWord} characters from your guess are in the target word.`;
      this.correctPositionMessage = `And ${correctPositions} of them are in the correct position.`;

    }
  }

  startNewGame() {
    this.gameService.getWord().subscribe((data: any) => {
      this.enteredWord = '';
      this.lastGuess = ''
      this.guessState = 'noGuess';
      this.targetWord = data.word.toLowerCase();
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.gameService.getWord().subscribe((data: any) => {
      this.targetWord = data.word.toLowerCase();
      console.log(data);
    });
  }

}
