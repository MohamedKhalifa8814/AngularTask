import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
  isLoading = signal(false)
  activeRequsests = 0
  constructor() { }
  show() {
    this.activeRequsests++;
    this.isLoading.set(true);
  }
  hide() {
    this.activeRequsests--;
    if (this.activeRequsests <= 0) {
      this.activeRequsests = 0;
      this.isLoading.set(false)
    }
  }
  get Loading() {
    return this.isLoading.asReadonly();
  }
}
