import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../staff/data';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../admin_panel/dashboard/service';
import { ServiceData, ServiceResponse } from '../../data_type/service/servicetype';
import { ApiData } from '../../admin_panel/service/api-data';
import { Userdata, UsersResponse } from '../../data_type/signup';
import { StaffResponse } from '../edit_staff';

@Component({
  selector: 'app-edit-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-staff.html',
  styleUrls: ['./edit-staff.css'],
})
export class EditStaff implements OnInit {
  constructor(
    private service: Data,
    private active: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private serviceApi: Service,
    private apidata: ApiData,
  ) {}

  staffId: string = '';

  staffData = {
    userName: '',
    phone_number: '',
    experience: '',
    address: '',
    description: '',
    serviceIds: [] as string[],
    serviceNames: [] as string[],
  };

  // User related
  userdata: Userdata[] = [];
  searchText: string = '';
  dropdownOpen: boolean = false;
  filteredUsers: Userdata[] = [];

  // Service related
  services: ServiceData[] = [];
  serviceSearchText: string = '';
  serviceDropdownOpen: boolean = false;
  filteredServices: ServiceData[] = [];
  selectedServices: ServiceData[] = [];

  // Loading state
  isLoading: boolean = true;

  ngOnInit(): void {
    this.staffId = this.active.snapshot.paramMap.get('id') || '';
    console.log('Staff ID:', this.staffId);

    if (this.staffId) {
      this.loadAllData();
    } else {
      console.error('No staff ID found');
      alert('Invalid staff ID');
      this.router.navigate(['/staff-list']);
    }
  }

  async loadAllData() {
    this.isLoading = true;

    // Load users and services first
    await this.getData();
    await this.get_services();

    // Then load staff data
    this.loadStaffData();
  }

  getData() {
    return new Promise((resolve, reject) => {
      this.serviceApi.get_users().subscribe({
        next: (res: UsersResponse) => {
          this.userdata = res.data;
          this.filteredUsers = [...res.data];
          this.cd.detectChanges();
          resolve(true);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          reject(error);
        },
      });
    });
  }

  get_services() {
    return new Promise((resolve, reject) => {
      this.apidata.get_services().subscribe({
        next: (res: ServiceResponse) => {
          this.services = res.data;
          this.filteredServices = [...res.data];
          console.log('Available services:', this.services);
          this.cd.detectChanges();
          resolve(true);
        },
        error: (error) => {
          console.error('Error fetching services:', error);
          reject(error);
        },
      });
    });
  }

  loadStaffData() {
    this.service.singleStaff(this.staffId).subscribe({
      next: (res: StaffResponse) => {
        console.log('Staff API Response:', res);

        if (res.success && res.message) {
          const staff = res.message;

          // Populate form data
          this.staffData.userName = staff.user_id?.userName || '';
          this.searchText = staff.user_id?.userName || '';

          this.staffData.phone_number = staff.phone_number || '';
          this.staffData.experience = staff.experience || '';
          this.staffData.address = staff.address || '';
          this.staffData.description = staff.description || '';

          // Populate selected services
          if (staff.service_id && staff.service_id.length > 0) {
            // Convert service_id to ServiceData format
            this.selectedServices = staff.service_id.map((service) => ({
              _id: service._id,
              Service_Name: service.Service_Name,
              price: service.price,
              discount: service.discount,
              final_price: service.final_price,
              duration: service.duration,
              description: service.description,
              service_Image: service.service_Image,
              category: service.category as any,
              createdAt: service.createdAt,
              updatedAt: service.updatedAt,
              __v: service.__v,
            })) as ServiceData[];

            this.staffData.serviceIds = staff.service_id.map((s) => s._id);
            this.staffData.serviceNames = staff.service_id.map((s) => s.Service_Name);
          }

          console.log('Loaded staff data:', this.staffData);
          console.log('Selected services:', this.selectedServices);
          this.isLoading = false;
          this.cd.detectChanges();
        } else {
          console.error('Failed to load staff data:', res);
          alert('Failed to load staff data');
          this.router.navigate(['/staff-list']);
        }
      },
      error: (error) => {
        console.error('Error loading staff:', error);
        alert('Error loading staff data');
        this.isLoading = false;
        this.router.navigate(['/staff-list']);
      },
    });
  }

  filterUsers() {
    if (this.searchText.trim() === '') {
      this.filteredUsers = [...this.userdata];
    } else {
      this.filteredUsers = this.userdata.filter((user) =>
        user.userName.toLowerCase().includes(this.searchText.toLowerCase()),
      );
    }
  }

  selectUser(user: Userdata) {
    this.staffData.userName = user.userName;
    this.searchText = user.userName;
    this.dropdownOpen = false;
  }

  closeDropdown() {
    setTimeout(() => {
      this.dropdownOpen = false;
    }, 200);
  }

  // Service dropdown methods
  filterServices() {
    if (this.serviceSearchText.trim() === '') {
      this.filteredServices = [...this.services];
    } else {
      this.filteredServices = this.services.filter((service) =>
        service.Service_Name.toLowerCase().includes(this.serviceSearchText.toLowerCase()),
      );
    }
    this.cd.detectChanges();
  }

  toggleServiceDropdown() {
    this.serviceDropdownOpen = !this.serviceDropdownOpen;
    if (this.serviceDropdownOpen) {
      this.filteredServices = [...this.services];
    }
  }

  closeServiceDropdown() {
    this.serviceDropdownOpen = false;
  }

  isServiceSelected(service: ServiceData): boolean {
    return this.selectedServices.some((s) => s._id === service._id);
  }

  selectService(service: ServiceData, event: Event) {
    event.stopPropagation();

    if (this.isServiceSelected(service)) {
      console.log('Service already selected:', service.Service_Name);
      return;
    }

    this.selectedServices.push(service);
    this.staffData.serviceIds.push(service._id);
    this.staffData.serviceNames.push(service.Service_Name);

    console.log('Service added:', service.Service_Name);
    console.log('All service IDs:', this.staffData.serviceIds);

    this.serviceSearchText = '';
    this.filteredServices = [...this.services];
    this.cd.detectChanges();
  }

  removeService(service: ServiceData, event: Event) {
    event.stopPropagation();
    const index = this.selectedServices.findIndex((s) => s._id === service._id);
    if (index !== -1) {
      this.selectedServices.splice(index, 1);
      this.staffData.serviceIds.splice(index, 1);
      this.staffData.serviceNames.splice(index, 1);
    }
    this.cd.detectChanges();
  }

  updateStaff() {
    // Validation
    if (
      !this.staffData.userName ||
      !this.staffData.phone_number ||
      !this.staffData.experience ||
      !this.staffData.address ||
      !this.staffData.description ||
      !this.selectedServices.length
    ) {
      alert('Please fill all required fields and select at least one service!');
      return;
    }

    // Prepare payload matching the API expected format
    const payload = {
      userName: this.staffData.userName,
      phone_number: this.staffData.phone_number,
      experience: this.staffData.experience,
      address: this.staffData.address,
      description: this.staffData.description,
      Service_Name: this.staffData.serviceNames,
    };

    console.log('Updating staff with payload:', payload);

    this.service.updateStaff(this.staffId, payload).subscribe({
      next: (res: StaffResponse) => {
        console.log('Staff updated successfully:', res);
        if (res.success) {
          alert('Staff updated successfully!');
          this.router.navigate(['/get_staff']);
        } else {
          alert('Failed to update staff: ' + res.data);
        }
      },
      error: (error) => {
        console.error('Error updating staff:', error);
        console.error('Error details:', error.error);

        let errorMessage = 'Error updating staff. ';
        if (error.error?.message) {
          errorMessage += error.error.message;
        }
        if (error.error?.error) {
          errorMessage += '\nDetails: ' + JSON.stringify(error.error.error);
        }
        alert(errorMessage);
      },
    });
  }

  cancel() {
    this.router.navigate(['/staff-list']);
  }
}
