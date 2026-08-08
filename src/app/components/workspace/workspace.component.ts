import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { filter, fromEvent, map, Observable, pairwise, startWith, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { CanvasService } from '../../services/canvas/canvas.service';
import { LineCoords } from '../../model/canvas.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
  providers: [CanvasService],
})
export class WorkspaceComponent {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  private canvasService = inject(CanvasService);

  /** Событие для отслеживания (PointerEvent) */
  private pointerDown$ = new Observable<LineCoords>();
  private pointerMove$ = new Observable<PointerEvent>();
  private pointerUp$ = new Observable<PointerEvent>();

  /** Подписка на это событие */
  private drawingSubscription = new Subscription();

  ngAfterViewInit() {
    this.canvasService.canvasElement = this.canvas.nativeElement;
    this.canvasService.setCanvas();
    this.pointerUp$ = fromEvent<PointerEvent>(this.canvas.nativeElement, 'pointerup');
    this.pointerMove$ = fromEvent<PointerEvent>(this.canvas.nativeElement, 'pointermove');

    this.pointerDown$ = fromEvent<PointerEvent>(this.canvas.nativeElement, 'pointerdown')
      .pipe(
        // Проверяем, что нажата именно левая кнопка мыши
        filter((event: PointerEvent) => Boolean(event.buttons & 1)),
        tap((event: PointerEvent) => this.canvasService.drawPoint({ x: event.offsetX, y: event.offsetY })),
        switchMap((event: PointerEvent) =>
          this.pointerMove$.pipe(
            startWith(event),
            pairwise<PointerEvent>(),
            map(([previous, current]): LineCoords => ({
              startX: previous.offsetX,
              startY: previous.offsetY,
              endX: current.offsetX,
              endY: current.offsetY,
            })),
            takeUntil(this.pointerUp$),
          )
        )
      );

    this.drawingSubscription = this.pointerDown$.subscribe({
      next: (path: LineCoords) => {
        console.log(path);
        this.canvasService.drawLine(path)
      }
      })
  }

  ngOnDestroy() {
    /** Отписка */
    this.drawingSubscription.unsubscribe();
  }
}
