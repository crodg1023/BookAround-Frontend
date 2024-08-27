import { Component } from '@angular/core';
import { SideBarComponent } from '../../Layout/side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../Layout/navbar/navbar.component';
import { ControlPanelTabsComponent } from '../../Components/Utils/control-panel-tabs/control-panel-tabs.component';
import { FooterComponent } from '../../Layout/footer/footer.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [SideBarComponent, RouterOutlet, NavbarComponent, ControlPanelTabsComponent, FooterComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
