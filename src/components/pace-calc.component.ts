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
  min = 150;
  max = 600;
  pace = 360; // 6:00 min/km
  paceMinutes = 6;
  paceSeconds = 0;
  unit = 'km';
  times: { [key: string]: number } = {
    '10K': 0,
    '21K': 0,
    '42K': 0
  };

  get minimumPace(): string {
    return this.formatTime(this.min, true);
  }

  get maximumPace(): string {
    return this.formatTime(this.max, true);
  }

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
    const paceInSeconds = this.unit === 'km' ? this.pace : this.pace * 1.60934;
    this.times['10K'] = paceInSeconds * 10;
    this.times['21K'] = paceInSeconds * 21.0975;
    this.times['42K'] = paceInSeconds * 42.195;
  }

  toggleUnit() {
    if (this.unit === 'km') {
      this.unit = 'mi';
      this.pace = Math.round(this.pace / 1.60934);
    } else {
      this.unit = 'km';
      this.pace = Math.round(this.pace * 1.60934);
    }
    this.updatePaceFromSlider();
  }

  formatTime(seconds: number, short: boolean = false): string {
    const h = Math.floor(seconds / 3600);
    const mm = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const ss = Math.floor(seconds % 60).toString().padStart(2, '0');

    if (short) {
      return `${mm}:${ss}`;
    }
    return `${h}:${mm}:${ss}`;
  }
}