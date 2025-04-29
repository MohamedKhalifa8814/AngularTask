import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./Componates/nav-bar/nav-bar.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoaderComponent } from "./Componates/loader/loader/loader.component";


@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule, RouterOutlet, NavBarComponent, LoaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Products';
}
