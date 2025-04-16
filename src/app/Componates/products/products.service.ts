import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../classes/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = "https://dummyjson.com/products";

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl)
  }
  getProductById(id: number) {
    return this.http.get<Product[]>(this.baseUrl + id)
  }
  getProductByTitle(title: string) {
    return this.http.get<Product[]>(this.baseUrl + title)
  }
}
