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
  Step = Step
  step: Step = Step.PICK;

  ngOnInit() {
    this.answer = this.chooseDoor();
    console.log(this.answer);
  }

  chooseDoor(): number {
    const [min, max] = [1, 3];
    return Math.floor(Math.random() * ((max+1) - min) + min);
  }

  getDoorMessage(doorNumber: number): string {
    if (doorNumber === this.answer) return "Yes";
    return "Loser";
  }

  choseDoor(event: number) {
    if (this.step === Step.PICK) {
      this.chosenDoor = event;
      this.step = Step.CONFIRM_PICK;
    } else if (this.step === Step.SWAP) {
      this.chosenDoor = event;
      this.step = Step.CONFIRM_SWAP;
    }
    console.log(this.step);
    
  }

  confirmPick() {
    if (this.step === Step.CONFIRM_PICK) {
      this.step = Step.SWAP;
      this.chooseFinalDoors();
    } else if (this.step === Step.CONFIRM_SWAP) {
      this.step = Step.END;
      // win condition
    }
    console.log(this.step.toString());
  }

  cancelPick() {
    if (this.step === Step.CONFIRM_PICK) {
      this.step = Step.PICK;
    } else if (this.step === Step.CONFIRM_SWAP) {
      this.step = Step.SWAP;
    }
    console.log(this.step);
  }

  chooseFinalDoors() {
    if (this.answer == this.chosenDoor) {
      const remainingDoors = this.doors.filter(door => door != this.answer);
      const randomRemaining = Math.floor(Math.random() * remainingDoors.length);
      this.doors = [this.answer, remainingDoors[randomRemaining]].sort();
      console.log(this.doors);
    } else {
      this.doors = [this.answer, this.chosenDoor!!].sort();
      console.log(this.doors);
    }
  }

  doorIsOpen(doorNumber: number): boolean {
    if (this.step == Step.END && this.chosenDoor!! == doorNumber) {
      return true;
    }
    return false;
  }

}



/*
  TODO:
  - win text
  - organize css
  - change yes/no options
  - change swap text
  - add beginner text
  - center/enlarge text
  - play again
  - win count
*/
