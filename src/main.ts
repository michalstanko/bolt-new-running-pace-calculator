import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PaceCalcComponent } from './components/pace-calc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaceCalcComponent],
  template: `
    <div class="container">
      <h1><span class="rp">Running Pace</span> vs <span class="ft">Finish Time</span></h1>
      <app-pace-calc></app-pace-calc>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f4f8;
    }
    .container {
      max-width: 500px;
      width: 100%;
      margin: 0 auto;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      background-color: #fff;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    }
  `],
})
export class App {

}

bootstrapApplication(App);