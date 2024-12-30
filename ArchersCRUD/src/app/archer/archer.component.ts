import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ArcherModel } from '../models/archerModel';

@Component({
  selector: 'app-archer',
  imports: [],
  templateUrl: './archer.component.html',
  styleUrl: './archer.component.css'
})
export class ArcherComponent {
  @Input() model: ArcherModel | undefined = undefined;
  @Output() saved = new EventEmitter<ArcherModel>();

  getValue(event: any): string {
    return event.target.value;
  }

  save() {
    this.saved.emit(this.model);
  }
}
