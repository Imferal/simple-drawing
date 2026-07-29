import { Injectable, signal } from '@angular/core';

@Injectable()
export class ToolsStateService {
  private readonly initialState: ToolsState = {
    color: '#ffffff',
    size: 4,
  }

  private readonly _toolsState = signal<ToolsState>({ ...this.initialState });

  setSize(size: number) {
    this._toolsState.update(state => ({
      ...state,
      size,
    }));

    console.log(this.toolsState().size)
  }

  setColor(color: HexColor) {
    this._toolsState.update(state => ({
      ...state,
      color,
    }));

    console.log(this.toolsState().color)
  }

  readonly toolsState = this._toolsState.asReadonly();
}
