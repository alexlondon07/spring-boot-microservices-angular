import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-menu-item',
  template: `
    <mat-list>
      <ng-container *ngFor="let item of menu">
        <!-- If the item doesn't have children show it as list item-->
        <ng-container *ngIf="item.subMenu === undefined">
          <mat-list-item
            *ngIf="item.title"
            [routerLink]="item.link"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <mat-icon [style.color]="item.color" mat-list-icon>
              {{ item.icon }}
            </mat-icon>
            <div mat-line>{{ item.title }}</div>
          </mat-list-item>
        </ng-container>

        <!-- If the item has subMenu show it as accordion-->
        <ng-container *ngIf="item.subMenu?.length > 0">
          <mat-expansion-panel [expanded]="item.expanded">
            <mat-expansion-panel-header>
              <mat-panel-title class="d-flex align-items-center">
                <mat-icon [style.color]="item.color" mat-list-icon>
                  {{ item.icon }}
                </mat-icon>
                <span mat-line class="list-item">{{ item.title }}</span>
              </mat-panel-title>
            </mat-expansion-panel-header>
            <app-menu-item [menu]="item.subMenu"></app-menu-item>
          </mat-expansion-panel>
        </ng-container>
      </ng-container>
    </mat-list>
  `,
  styleUrls: ['./menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @Input() menu: Menu = [];
}
