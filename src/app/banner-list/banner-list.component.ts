import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { Banner, Entities } from '../models/banner.model';
import { ApiService } from '../api.service.spec';
import { PageEvent } from '@angular/material/paginator';
import { sortItems } from '../cconst';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
})
export class BannerListComponent implements OnInit {
  banners: Banner = { total: 0, entities: [] };
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  totalItems: number = 0;
  sortBy: string = '';
  filterText: string = '';
  sortItemsArray = sortItems;
  sharedId: string = '';
  selectedBanner: Entities | undefined;
  @ViewChild('focus', { read: ElementRef }) divInput: ElementRef | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchBanners();
    this.calculatePageSize();
  }

  calculatePageSize() {
    this.pageSize = Math.min(10, this.totalItems);
  }

  fetchBanners(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : -1;
    // Call the findBanners method from the ApiService
    this.apiService
      .findBanners(pageIndex + 1, this.pageSize, this.filterText, this.sortBy)
      .subscribe((data) => {
        // Handle the API response and update this.banners as needed
        this.banners = data.data;
        this.totalItems = data.data.total;

        this.calculatePageSize();
      });

    this.scrollUp();
  }

  scrollUp(): void {
    setTimeout(() =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Add smooth scrolling behavior
      })
    );
  }

  clickHandle(accessor: string): void {
    this.sortBy = accessor;
    this.fetchBanners();
  }

  handleBannerSave(banner: Entities) {
    this.selectedBanner = banner;
    return (this.sharedId = banner.id);
  }
}
