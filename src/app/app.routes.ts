import { Routes } from '@angular/router';
import { HomeComponent } from './Componates/home/home.component';
import { ProductsComponent } from './Componates/products/products.component';
import { LoginComponent } from './Componates/login/login.component';
import { LogoutComponent } from './Componates/logout/logout.component';
import { NotfoundComponent } from './Componates/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  { path: 'products', component: ProductsComponent, title: 'Product Page' },
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'logout', component: LogoutComponent, title: 'Logout Page' },
  { path: '**', component: NotfoundComponent, title: 'Not Found' }
];
