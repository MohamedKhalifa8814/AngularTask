import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Product } from '../../classes/products';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductsService } from './products.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatPaginatorModule, MatIconModule, MatProgressBarModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['demo-id', 'demo-title', 'demo-description', 'demo-price', 'demo-rating', 'demo-tags', 'demo-brand'];
  dataSource = new MatTableDataSource<Product>([]);
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = signal(true);
  isFiltering = signal(false);

  constructor(private productSevice: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log("dataSource", this.dataSource);

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProducts() {
    this.isLoading.set(true)
    this.productSevice.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.dataSource.data = this.products;
        this.length = this.products.length;
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.isLoading.set(false);
      }
    })
  }
  applyFilter(event: Event) {
    this.isFiltering.set(true)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.isFiltering.set(false);


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  getStarIcon(star: number, rating: number): string {
    if (rating >= star) return 'star';
    if (rating >= star - 0.5) return 'star_half';
    return 'star_border';
  }

}
