import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArcherModel } from './models/archerModel';
import { DataService } from '../services/data.service';
import { ArcherComponent } from "./archer/archer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  archers: ArcherModel[] = [];
  modify: ArcherModel | undefined = undefined;
  new: ArcherModel | undefined = undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getArchers().subscribe({
      next: (data: ArcherModel[]) => {
        this.archers = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newArcher() {
    this.new = {
      id: undefined,
      name: '',
      birth_date: '',
      nationality: '',
      bow_type: '',
      coach_name: ''
    };
  }

  saveNew(archer: ArcherModel) {
    if (!archer.name || !archer.birth_date || !archer.nationality || !archer.bow_type || !archer.coach_name) {
      alert('Töltse ki az összes mezőt!');
      return;
    }
    this.dataService.addArcher(archer).subscribe({
      next: (data: ArcherModel) => {
        this.archers.push(data);
        this.new = undefined;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  modifyArcher(archer: ArcherModel) {
    this.modify = JSON.parse(JSON.stringify(archer));
  }

  saveModified(archer: ArcherModel) {
    if (!archer.name || !archer.birth_date || !archer.nationality || !archer.bow_type || !archer.coach_name) {
      alert('Töltse ki az összes mezőt!');
      return;
    }
    this.dataService.modifyArcher(archer).subscribe({
      next: (data: ArcherModel) => {
        const index = this.archers.findIndex((a) => a.id == data.id);
        this.archers[index] = data;
        this.modify = undefined;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteArcher(archer: ArcherModel) {
    if (!confirm('Biztosan törölni szeretné ezt az íjászt?')) {
      return;
    }
    this.dataService.deleteArcher(archer).subscribe({
    next: (data: ArcherModel) => {
      const index = this.archers.findIndex((a) => a.id == data.id);
      this.archers.splice(index, 1);
    },
    error: (err) => {
      console.log(err);
    },
  });}
}
