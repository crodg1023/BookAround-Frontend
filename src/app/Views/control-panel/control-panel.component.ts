import { Component } from '@angular/core';
import { SideBarComponent } from '../../Layout/side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
