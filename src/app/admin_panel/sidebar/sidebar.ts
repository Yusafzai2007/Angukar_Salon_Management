import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  isSidebarOpen = true;
  screenWidth = 0;
  isMobileView = false;
  showConfigure = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      this.checkScreen();
    } else {
      // Default values for SSR
      this.isMobileView = false;
      this.isSidebarOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = (event.target as Window).innerWidth;
      this.checkScreen();
    }
  }

  configureItems = [
    { name: 'Product_group', link: '/admin/product_group', icon: 'fas fa-layer-group' },
    { name: 'Add_Product', link: '/admin/add_product', icon: 'fas fa-plus-square' },
    { name: 'Products', link: '/admin/products', icon: 'fas fa-boxes' },
  ];

  checkScreen() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = this.screenWidth < 1024;
      if (this.isMobileView) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      console.log('Screen width:', this.screenWidth, 'Mobile view:', this.isMobileView, 'Sidebar open:', this.isSidebarOpen);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled:', this.isSidebarOpen);
  }

  toggleConfigure() {
    this.showConfigure = !this.showConfigure;
  }

  getInventoryItems() {
    return this.configureItems;
  }

  getConfigureHeight(): string {
    return '480px';
  }

  get shouldShowSidebar() {
    return this.isSidebarOpen;
  }

  closeSidebarOnMobile() {
    if (this.isMobileView) {
      this.isSidebarOpen = false;
    }
  }
}