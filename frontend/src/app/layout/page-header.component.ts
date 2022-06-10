import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="feature-header justify-content-between align-items-center">
      <div class="start">
        <div class="title">
          <mat-icon *ngIf="icon" class="feature-icon mr-3">
            {{ icon }}
          </mat-icon>
          <ng-content select="h2"></ng-content>
        </div>

        <ng-content select="p"></ng-content>
      </div>

      <ng-content select=".action"></ng-content>
    </div>
  `,
  styles: [
    `
      .feature-header {
        background: white;
        padding: 15px 20px;
        border-bottom: 1px solid #ececec;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        box-shadow: 0 0 4px 2px #ececec;

        // Make feature header sticky
        position: sticky;
        top: 0;
        z-index: 9999;

        margin-bottom: 20px;
      }

      .title {
        display: flex;
        align-items: center;
        gap: 15px;
        height: 30px;
      }

      .feature-header > .start {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      h1,
      h2,
      p {
        margin-bottom: 0;
      }

      p {
        color: #848484;
      }

      .feature-icon {
        font-size: 35px;
        width: 35px;
        height: auto;
      }
    `
  ]
})
export class PageHeaderComponent {
  @Input() icon?: string;
}
