import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild, DestroyRef, inject } from '@angular/core';
import { IProduct } from '../../Interface/iproducts';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductsService } from './products.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductParams } from '../../Interface/productparams';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatInputModule,
    MatSelectModule, MatFormFieldModule,
    MatPaginatorModule, MatIconModule,
    MatProgressSpinnerModule, MatProgressBarModule,
    CommonModule, MatSortModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: IProduct[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'rating', 'tags', 'brand'];
  dataSource = new MatTableDataSource<IProduct>([]);
  productParams = new ProductParams;
  productLength = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  search = "";
  isLoading = signal(true);
  isFiltering = signal(false);
  destroyRef = inject(DestroyRef);

  // @ViewChild('search') searchTerm!: ElementRef;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private productSevice: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log("dataSource", this.dataSource);

  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  getProducts() {
    this.isLoading.set(true)
    this.productParams.limit = this.pageSize;
    this.productParams.skip = this.pageIndex * this.pageSize;

    this.productSevice.getProduct(this.productParams).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.productLength = res.total;
        this.dataSource.data = res.products;

        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.isLoading.set(false);
      }
    })
  }
  applyFilter(event: Event) {
    debugger
    const filterValue = (event.target as HTMLInputElement).value;
    this.search = filterValue.trim().toLowerCase();
    this.isLoading.set(true)
    this.productSevice.searchProduct(this.search).subscribe({
      next: (res: any) => {
        this.productLength = res.total;
        this.dataSource.data = res.products;

        this.isLoading.set(false)
      },

    })
  }
  onPageChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getProducts();
  }

  onSortChange(sort: Sort) {
    debugger;
    this.productParams.sortBy = sort.active;
    this.productParams.order = sort.direction;
    this.getProducts();
  }

  getStarIcon(star: number, rating: number): string {
    if (rating >= star) return 'star';
    if (rating >= star - 0.5) return 'star_half';
    return 'star_border';
  }

}
