import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PaceCalcComponent } from './components/pace-calc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaceCalcComponent],
  template: `
    <div class="container">
      <h1>Running Pace Calculator</h1>
      <app-pace-calc></app-pace-calc>
    </div>
  `,
  styles: [`
    .container {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  `],
})
export class App {

}

bootstrapApplication(App);