import { Component } from '@angular/core';

@Component({
  selector: 'app-sales',
  template: `
    <app-page-header icon="monetization_on">
      <h2>Sales</h2>

      <button routerLink="/home" mat-flat-button color="primary" class="action">
        <mat-icon class="mr-2">home</mat-icon>
        <span>Go home</span>
      </button>
    </app-page-header>

    <div style="padding: 0 20px">
      Hello from Sales
    </div>
  `
})
export class SalesComponent {}
