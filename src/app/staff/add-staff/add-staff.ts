import { ChangeDetectorRef, Component } from '@angular/core';
import { Data } from '../staff/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Userdata, UsersResponse } from '../../data_type/signup';
import { Service } from '../../admin_panel/dashboard/service';
import { ServiceData, ServiceResponse } from '../../data_type/service/servicetype';
import { ApiData } from '../../admin_panel/service/api-data';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-staff.html',
  styleUrl: './add-staff.css',
})
export class AddStaff {
  constructor(
    private staffService: Data,
    private service: Service,
    private cd: ChangeDetectorRef,
    private apidata: ApiData,
  ) {}

  staffData = {
    userName: '',
    phone_number: '',
    experience: '',
    address: '',
    description: '',
    Service_Name: [] as string[], // Changed to store service names/IDs
  };

  userdata: Userdata[] = [];
  searchText: string = '';
  dropdownOpen: boolean = false;
  filteredUsers: Userdata[] = [];

  // Service related properties
  services: ServiceData[] = [];
  serviceSearchText: string = '';
  serviceDropdownOpen: boolean = false;
  filteredServices: ServiceData[] = [];
  selectedServices: ServiceData[] = []; // Store selected service objects

  ngOnInit(): void {
    this.getData();
    this.get_services();
  }

  getData() {
    this.service.get_users().subscribe({
      next: (res: UsersResponse) => {
        this.userdata = res.data;
        this.filteredUsers = [...res.data];
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching users:', error);
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
  }

  toggleServiceDropdown() {
    this.serviceDropdownOpen = !this.serviceDropdownOpen;
    if (this.serviceDropdownOpen) {
      this.filteredServices = [...this.services];
    }
  }

  closeServiceDropdown() {
    setTimeout(() => {
      this.serviceDropdownOpen = false;
    }, 200);
  }

  selectService(service: ServiceData) {
    // Check if service already selected
    const isSelected = this.selectedServices.some(s => s._id === service._id);
    
    if (!isSelected) {
      this.selectedServices.push(service);
      this.staffData.Service_Name.push(service.Service_Name);
    }
    
    this.serviceSearchText = '';
    this.filteredServices = [...this.services];
    this.cd.detectChanges();
  }

  removeService(service: ServiceData) {
    const index = this.selectedServices.findIndex(s => s._id === service._id);
    if (index !== -1) {
      this.selectedServices.splice(index, 1);
      this.staffData.Service_Name.splice(index, 1);
    }
    this.cd.detectChanges();
  }

  get_services() {
    this.apidata.get_services().subscribe((res: ServiceResponse) => {
      this.services = res.data;
      this.filteredServices = [...res.data];
      console.log('services', this.services);
      this.cd.detectChanges();
    });
  }

  createStaff() {
    // Validation
    if (
      !this.staffData.userName ||
      !this.staffData.phone_number ||
      !this.staffData.experience ||
      !this.staffData.address ||
      !this.staffData.description ||
      !this.staffData.Service_Name.length
    ) {
      alert('Please fill all required fields and select at least one service!');
      return;
    }

    this.staffService.createStaff(this.staffData).subscribe({
      next: (res) => {
        console.log('Staff created successfully:', res);
        alert('Staff created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating staff:', error);
        alert('Error creating staff. Please try again.');
      },
    });
  }

  resetForm() {
    this.staffData = {
      userName: '',
      phone_number: '',
      experience: '',
      address: '',
      description: '',
      Service_Name: [],
    };
    this.searchText = '';
    this.dropdownOpen = false;
    this.filteredUsers = [...this.userdata];
    this.selectedServices = [];
    this.serviceSearchText = '';
    this.cd.detectChanges();
  }
}