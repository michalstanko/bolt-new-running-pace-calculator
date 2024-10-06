import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h1>Running Pace Calculator</h1>
      <div class="pace-input">
        <label>Pace:</label>
        <input type="number" [(ngModel)]="paceMinutes" min="0" max="15" (ngModelChange)="updatePaceFromInput()">
        <span>:</span>
        <input type="number" [(ngModel)]="paceSeconds" min="0" max="59" (ngModelChange)="updatePaceFromInput()">
        <span>{{ unit }}</span>
      </div>
      <div class="pace-slider">
        <input type="range" [(ngModel)]="pace" min="180" max="900" step="5" (input)="updatePaceFromSlider()">
      </div>
      <button (click)="toggleUnit()">Switch to {{ unit === 'min/km' ? 'min/mi' : 'min/km' }}</button>
      <div class="results">
        <div class="result-box">
          <h2>10K</h2>
          <p>{{ formatTime(times['10K']) }}</p>
        </div>
        <div class="result-box">
          <h2>Half Marathon</h2>
          <p>{{ formatTime(times['halfMarathon']) }}</p>
        </div>
        <div class="result-box">
          <h2>Marathon</h2>
          <p>{{ formatTime(times['marathon']) }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .pace-input {
      margin-bottom: 10px;
    }
    .pace-input input[type="number"] {
      width: 50px;
      margin: 0 5px;
    }
    .pace-slider {
      margin-bottom: 20px;
    }
    input[type="range"] {
      width: 100%;
    }
    button {
      margin-bottom: 20px;
    }
    .results {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    .result-box {
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      flex: 1;
      margin: 0 10px;
    }
    .result-box h2 {
      margin-top: 0;
    }
    .result-box p {
      font-size: 1.2em;
      font-weight: bold;
    }
  `]
})
export class App {
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

bootstrapApplication(App);