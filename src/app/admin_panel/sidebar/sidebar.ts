import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserDataResponse } from '../../data_type/signup';
import { Service } from '../dashboard/service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  isSidebarOpen = true;
  screenWidth = 0;
  isMobileView = false;
  showConfigure = false;

  constructor(
    private service: Service,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
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
    { name: 'Services', link: '/admin/service', icon: 'fas fa-layer-group' },
    { name: 'Add_Services', link: '/admin/add_service', icon: 'fas fa-plus-square' },
    { name: 'Service Categories', link: '/admin/get_service_category', icon: 'fas fa-boxes' },
  ];

  checkScreen() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = this.screenWidth < 1024;
      if (this.isMobileView) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      console.log(
        'Screen width:',
        this.screenWidth,
        'Mobile view:',
        this.isMobileView,
        'Sidebar open:',
        this.isSidebarOpen,
      );
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

  currentUserData: UserDataResponse['data'] | null = null;

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    this.service.currentuser().subscribe((res: UserDataResponse) => {
      this.currentUserData = res.data;
      this.cd.detectChanges(); // Ensure view updates with new data
    });
  }


  logout_user() {
    this.service.logout().subscribe(
      (res) => {
        console.log('Logout successful:', res);
        // Optionally, you can navigate to the login page or show a message
      },
      (error) => {
        console.error('Logout failed:', error);
        // Optionally, handle logout failure (e.g., show an error message)
      }
    );
}
}
