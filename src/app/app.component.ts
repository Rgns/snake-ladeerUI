import {Component, OnInit} from '@angular/core';

class Boxes {

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'space-x';
  boxes: Boxes [];

  diceValue = 0;

  row = [];
  col = [];

  currentRow = 0;
  currentCol = 0;
  currentValue = 1;
  showInfo = false;
  hasWon = false;
  restartInfo = false;

  public ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.row[i] = i;
      this.col[i] = i;
    }
  }

  public _rollDice(): void {
    this.restartInfo = false;
    let num = Math.random();
    num = Math.round(num * 10);
    if (num > 6) {
      num = num - 5;
    } else if (num < 1) {
      num = num + 1;
    }
    this.diceValue = num;
    const value = this.currentValue + this.diceValue;
    if (value <= 100) {
      this.showInfo = false;
      this.currentValue += this.diceValue;
    } else {
      if (this.hasWon) {
        this.restartInfo = true;
        this.resetGame();
      } else {
        this.showInfo = true;
      }

    }

    this.getRowAndColumnValues();
  }

  getRowAndColumnValues(): void {
    const val = this.currentValue - 1;
    if (val < 10) {
      this.currentRow = 0;
      this.currentCol = val - 1;
    } else if (val >= 10 && val < 100) {
      this.currentRow = Math.floor(val / 10);
      this.currentCol = val % 10;
    } else if (val === 100) {
      this.currentRow = val / 10;
      this.currentCol = val % 10;
    }

    this.hasWon = (this.currentValue === 100);

  }


  private resetGame(): void {
    this.currentValue = 1;
    this.currentRow = 0;
    this.currentCol = 0;
    this.showInfo = false;
    this.hasWon = false;
    this.diceValue = 0;
  }
}
