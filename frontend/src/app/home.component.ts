import { Component } from '@angular/core';

@Component({
  template: `
    <app-page-header icon="home">
      <h2>Home</h2>

      <button
        routerLink="/sales"
        mat-flat-button
        color="primary"
        class="action"
      >
        <mat-icon class="mr-2">add</mat-icon>
        <span>New sale</span>
      </button>
    </app-page-header>

    <div style="padding: 0 20px">
      Hello from Home
    </div>
  `,
})
export class HomeComponent {}
