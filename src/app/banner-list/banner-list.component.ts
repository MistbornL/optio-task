import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { Banner } from '../models/banner.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service.spec';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
})
export class BannerListComponent implements OnInit {
  banners: Banner = { total: 0, entities: [] };
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  totalItems = 0;

  @ViewChild('focus', { read: ElementRef }) divInput: ElementRef | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchBanners();
    this.calculatePageSize();
  }

  calculatePageSize() {
    // Calculate the pageSize based on total items and your desired maximum items per page
    this.pageSize = Math.min(10, this.totalItems); // Adjust the 10 as needed
  }

  fetchBanners(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : -1;
    // Call the findBanners method from the ApiService
    this.apiService
      .findBanners(pageIndex + 1, this.pageSize)
      .subscribe((data) => {
        // Handle the API response and update this.banners as needed
        this.banners = data.data;
        this.totalItems = data.data.total;

        this.calculatePageSize();
        console.log(this.banners);
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
}
