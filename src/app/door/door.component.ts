import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.sass']
})
export class DoorComponent {
  @Input() message: String = ""
  @Input() doorNumber: number = 1
  @Output() choseDoor: EventEmitter<number> = new EventEmitter();
  
  @Input() isOpen: boolean = false;

  ngOnInit() {}

  open() {
    this.isOpen = !this.isOpen;
  }

  choose() {
    this.choseDoor.emit(this.doorNumber)
  }
}
