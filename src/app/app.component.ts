import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./Componates/nav-bar/nav-bar.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductsComponent } from "./Componates/products/products.component";


@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule, RouterOutlet, NavBarComponent, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Products';
}
