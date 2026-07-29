import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolsStateService } from './services/tools-state/tools-state.service';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HeaderComponent,
    WorkspaceComponent,
    ToolbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ToolsStateService,
  ],
  standalone: true,
})
export class AppComponent {
}
