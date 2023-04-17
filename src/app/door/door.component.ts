import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.sass']
})
export class DoorComponent {
  @Input() isWinningDoor: boolean = false;
  @Input() doorNumber: number = 1;
  @Output() choseDoor: EventEmitter<number> = new EventEmitter();

  lossEmoji: string = "";
  winEmoji: string = "";
  
  @Input() isOpen: boolean = false;

  ngOnInit() {
  }

  choose() {
    this.choseDoor.emit(this.doorNumber);

    [this.winEmoji, this.lossEmoji] = [this.getWinEmoji(), this.getLossEmoji()];
  }

  getMessage(): string {
    if (this.isWinningDoor) return this.winEmoji;
    return this.lossEmoji;
  }

  getLossEmoji(): string {
    const lossEmojis = ['🥲', '😭', '😓', '😒', '😞', '😔', '😟', '😕', '🙁', '️😣', '😖', '😫', '😩', '😢'];
    return lossEmojis[Math.floor(Math.random()*lossEmojis.length)];
  }

  getWinEmoji(): string {
    const winEmojis = ['🥳', '🍰', '💰', '🎁', '🎉'];
    return winEmojis[Math.floor(Math.random()*winEmojis.length)];
  }
}
