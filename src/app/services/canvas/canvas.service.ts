import { Injectable } from '@angular/core';
import { Coords, LineCoords } from '../../model/canvas.model';

@Injectable()
export class CanvasService {
  public ctx!: CanvasRenderingContext2D;
  public canvasElement!: HTMLCanvasElement;
  private rect: DOMRect | null = null;

  public setCanvas() {
    this.rect = this.canvasElement.getBoundingClientRect();

    this.canvasElement.width = this.rect.width;
    this.canvasElement.height = this.rect.height;

    this.ctx = this.canvasElement.getContext('2d')!;

    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  public drawPoint(coords: Coords): void {
    this.ctx.beginPath();
    this.ctx.arc(coords.x, coords.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  public drawLine(path: LineCoords) {
    console.log(path);
    this.ctx.beginPath();

    this.ctx.moveTo(path.startX, path.startY);
    this.ctx.lineTo(path.endX, path.endY);

    this.ctx.stroke();
  }
}
