import { Component } from '@angular/core';

export enum Step {
  PICK = "PICK",
  CONFIRM_PICK = "CONFIRM_PICK",
  PICKED = "PICKED",
  SWAP = "SWAP",
  CONFIRM_SWAP = "CONFIRM_SWAP",
  END = "END"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  doors: Array<number> = [1, 2, 3];
  answer: number = 0;
  chosenDoor?: number;
  Step = Step;
  step: Step = Step.PICK;
  played = 0;
  won = 0;
  winRate = 0


  ngOnInit() {
    this.setupGame();
  }

  setupGame() {
    this.doors = [1, 2, 3]
    this.step = Step.PICK;
    this.answer = this.chooseDoor();
    
  }

  chooseDoor(): number {
    const [min, max] = [1, 3];
    return Math.floor(Math.random() * ((max+1) - min) + min);
  }

  choseDoor(event: number) {
    if (this.step === Step.PICK) {
      this.chosenDoor = event;
      this.step = Step.CONFIRM_PICK;
    } else if (this.step === Step.SWAP) {
      this.chosenDoor = event;
      this.step = Step.CONFIRM_SWAP;
    }
  }

  confirmPick() {
    if (this.step === Step.CONFIRM_PICK) {
      this.step = Step.SWAP;
      this.chooseFinalDoors();
    } else if (this.step === Step.CONFIRM_SWAP) {
      this.step = Step.END;

      this.played++;
      if (this.answer == this.chosenDoor!!) this.won++;
      this.winRate = Math.floor((this.won / this.played) * 100);
    }
  }

  cancelPick() {
    if (this.step === Step.CONFIRM_PICK) {
      this.step = Step.PICK;
    } else if (this.step === Step.CONFIRM_SWAP) {
      this.step = Step.SWAP;
    }
  }

  chooseFinalDoors() {
    if (this.answer == this.chosenDoor) {
      const remainingDoors = this.doors.filter(door => door != this.answer);
      const randomRemaining = Math.floor(Math.random() * remainingDoors.length);
      this.doors = [this.answer, remainingDoors[randomRemaining]].sort();
    } else {
      this.doors = [this.answer, this.chosenDoor!!].sort();
    }
  }

  doorIsOpen(doorNumber: number): boolean {
    if (this.step == Step.END && this.chosenDoor!! == doorNumber) {
      return true;
    }
    return false;
  }
  
  getFinalText(): string {
    if (this.chosenDoor!! == this.answer) return "Congratulations! You've won the prize!";
    else return "Sorry, but you didn't win this time. Better luck next time!";
  }

  reset() {
    this.played = 0;
    this.won = 0;
    this.winRate = 0;
  }
}