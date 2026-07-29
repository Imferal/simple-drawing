import { Component, inject } from '@angular/core';
import { ToolsStateService } from '../../services/tools-state/tools-state.service';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSlider,
    MatInput,
    MatSliderThumb,
  ],
})
export class ToolbarComponent {
  readonly tools = inject(ToolsStateService);

  setColor(event: Event) {
    const target = event.target as HTMLInputElement;
    this.tools.setColor(target.value as HexColor);
  }

  setSize(event: Event) {
    const target = event.target as HTMLInputElement;
    this.tools.setSize(Number(target.value));
  }
}
