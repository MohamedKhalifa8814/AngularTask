import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../Interface/iproducts';
import { ProductParams } from '../../Interface/productparams';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = "https://dummyjson.com/products";

  constructor(private http: HttpClient) { }

  getProduct(productParams: ProductParams) {
    let params = new HttpParams
    params = params.append('sortBy', productParams.sortBy);
    params = params.append('order', productParams.order);


    params = params.append('limit', productParams.limit.toString())
    params = params.append('skip', productParams.skip.toString())
    return this.http.get<IProduct>(this.baseUrl, { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      )
  }
  searchProduct(search: string) {
    return this.http.get<IProduct[]>(this.baseUrl + "/search?q=" + search)
  }
}
