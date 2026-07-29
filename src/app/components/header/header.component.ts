import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
})
export class HeaderComponent {
  logAction(actionName: string): void {
    console.log(`Вызвано действие: ${actionName}`);
  }

  logBrushSize(size: number): void {
    console.log(`Размер кисти изменен на: ${size}px`);
  }

  logBrushColor(color: string): void {
    console.log(`Цвет кисти изменен на: ${color}`);
  }

  logCanvasColor(color: string): void {
    console.log(`Холст залит цветом: ${color}`);
  }

  logCanvasSize(width: number, height: number): void {
    console.log(`Размер холста изменен на: ${width}x${height}`);
  }

  // isUndoDisabled(): boolean {
  // }

  // isRedoDisabled(): boolean {
  // }
}
