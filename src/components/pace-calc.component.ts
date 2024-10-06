import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-pace-calc',
  templateUrl: './pace-calc.component.html',
  styleUrl: './pace-calc.component.scss',
  imports: [FormsModule]
})
export class PaceCalcComponent {
  pace = 360; // 6:00 min/km
  paceMinutes = 6;
  paceSeconds = 0;
  unit = 'min/km';
  times: { [key: string]: number } = {
    '10K': 0,
    'halfMarathon': 0,
    'marathon': 0
  };

  ngOnInit() {
    this.updatePaceFromSlider();
  }

  updatePaceFromInput() {
    this.pace = this.paceMinutes * 60 + this.paceSeconds;
    this.calculateTimes();
  }

  updatePaceFromSlider() {
    this.paceMinutes = Math.floor(this.pace / 60);
    this.paceSeconds = this.pace % 60;
    this.calculateTimes();
  }

  calculateTimes() {
    const paceInSeconds = this.unit === 'min/km' ? this.pace : this.pace * 1.60934;
    this.times['10K'] = paceInSeconds * 10;
    this.times['halfMarathon'] = paceInSeconds * 21.0975;
    this.times['marathon'] = paceInSeconds * 42.195;
  }

  toggleUnit() {
    if (this.unit === 'min/km') {
      this.unit = 'min/mi';
      this.pace = Math.round(this.pace / 1.60934);
    } else {
      this.unit = 'min/km';
      this.pace = Math.round(this.pace * 1.60934);
    }
    this.updatePaceFromSlider();
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}