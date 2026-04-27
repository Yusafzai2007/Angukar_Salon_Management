import { Component, OnInit } from '@angular/core';
import { ApiData } from '../api-data';
import { Service_data, ServiceResponse } from '../../../data_type/service/servicetype';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-fetch',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './services-fetch.html',
  styleUrl: './services-fetch.css',
})
export class ServicesFetch implements OnInit {
  constructor(
    private service: ApiData,
    private cd: ChangeDetectorRef,
  ) {}

  services: Service_data[] = [];

  // Search properties
  searchTermServiceName: string = '';
  searchTermCategory: string = '';
  searchTermDuration: string = '';
  searchTermDiscount: string = '';
  searchTermDescription: string = '';
  filteredServices: Service_data[] = [];

  // Modal properties
  isModalOpen: boolean = false;
  selectedService: Service_data | null = null;
  currentImage: string | undefined;
  ngOnInit() {
    this.get_services();
  }

  getTotalRevenue(): string {
    const total = this.services.reduce(
      (sum, service) => sum + (parseFloat(service.final_price) || 0),
      0,
    );
    return `$${total.toFixed(2)}`;
  }

  getAvgDuration(): string {
    if (this.services.length === 0) return '0';
    const total = this.services.reduce(
      (sum, service) => sum + (parseInt(service.duration) || 0),
      0,
    );
    return Math.round(total / this.services.length).toString();
  }

  truncateText(text: string, length: number): string {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  filterServices() {
    this.filteredServices = this.services.filter((service) => {
      const matchesServiceName =
        !this.searchTermServiceName ||
        service.Service_Name.toLowerCase().includes(this.searchTermServiceName.toLowerCase());

      const matchesCategory =
        !this.searchTermCategory ||
        service.category.toLowerCase().includes(this.searchTermCategory.toLowerCase());

      const matchesDuration =
  !this.searchTermDuration ||
  Number(service.duration) === Number(this.searchTermDuration);
      const matchesDiscount =
        !this.searchTermDiscount || service.discount.toString().includes(this.searchTermDiscount);

      const matchesDescription =
        !this.searchTermDescription ||
        service.description.toLowerCase().includes(this.searchTermDescription.toLowerCase());

      return matchesServiceName && matchesCategory && matchesDuration && matchesDiscount && matchesDescription;
    });
  }

  clearServiceNameSearch() {
    this.searchTermServiceName = '';
    this.filterServices();
  }

  clearCategorySearch() {
    this.searchTermCategory = '';
    this.filterServices();
  }

  clearDurationSearch() {
    this.searchTermDuration = '';
    this.filterServices();
  }

  clearAllFilters() {
    this.searchTermServiceName = '';
    this.searchTermCategory = '';
    this.searchTermDuration = '';
    this.searchTermDiscount = '';
    this.searchTermDescription = '';
    this.filterServices();
  }

  clearDescriptionSearch() {
    this.searchTermDescription = '';
    this.filterServices();
  }
  clearDiscountSearch() {
    this.searchTermDiscount = '';
    this.filterServices();
  }

  clearfilters() {
    this.clearServiceNameSearch();
    this.clearCategorySearch();
    this.clearDurationSearch();
    this.clearDiscountSearch();
    this.clearDescriptionSearch();
  }

  openModal(service: Service_data) {
    this.selectedService = service;
    this.currentImage = service.service_Image?.[0] || 'assets/no-image.png';
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedService = null;
    this.currentImage = '';
    document.body.style.overflow = '';
  }

  closeModalOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.closeModal();
    }
  }

  setCurrentImage(image: string) {
    this.currentImage = image;
  }

  get_services() {
    this.service.get_services().subscribe((res: ServiceResponse) => {
      this.services = res.data;
      this.filteredServices = [...this.services];
      console.log('services', this.services);
      this.cd.detectChanges();
    });
  }

  tableheader = [
    '#',
    'Image',
    'Service Name',
    'Category',
    'Price',
    'Discount',
    'Final Price',
    'Duration',
    'Description',
    'Created At',
    'Updated At',
    'Actions',
  ];

  onfirmdelete(userId: string) {
    this.service.delete_service(userId).subscribe({
      next: (res) => {
        console.log('delete_user', res);
        alert('successfully');
        this.get_services();
      },
    });
  }
}
