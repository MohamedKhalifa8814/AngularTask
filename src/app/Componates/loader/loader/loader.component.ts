import { Component, inject } from '@angular/core';
import { LoaderServiceService } from '../../../Services/loader-service.service';


@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loaderService = inject(LoaderServiceService);

}
