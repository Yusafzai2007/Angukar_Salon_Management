import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../staff/data';
import { Userdata, UsersResponse } from '../../data_type/signup';
import { Service } from '../../admin_panel/dashboard/service';
import { ServiceData, ServiceResponse } from '../../data_type/service/servicetype';
import { ApiData } from '../../admin_panel/service/api-data';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-staff.html',
  styleUrls: ['./add-staff.css']
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
    serviceIds: [] as string[],
    serviceNames: [] as string[]
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
  selectedServices: ServiceData[] = [];

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

  // Check if service is already selected
  isServiceSelected(service: ServiceData): boolean {
    return this.selectedServices.some(s => s._id === service._id);
  }

  // Select service with validation to prevent double selection
  selectService(service: ServiceData, event: Event) {
    event.stopPropagation();
    
    // Check if service already selected
    if (this.isServiceSelected(service)) {
      console.log('Service already selected:', service.Service_Name);
      return; // Prevent double selection
    }
    
    // Add to selected services
    this.selectedServices.push(service);
    this.staffData.serviceIds.push(service._id);
    this.staffData.serviceNames.push(service.Service_Name);
    
    console.log('Service added:', service.Service_Name);
    console.log('All service IDs:', this.staffData.serviceIds);
    
    // Clear search text but keep dropdown open for multiple selections
    this.serviceSearchText = '';
    this.filteredServices = [...this.services];
    this.cd.detectChanges();
  }

  removeService(service: ServiceData, event: Event) {
    event.stopPropagation();
    const index = this.selectedServices.findIndex(s => s._id === service._id);
    if (index !== -1) {
      this.selectedServices.splice(index, 1);
      this.staffData.serviceIds.splice(index, 1);
      this.staffData.serviceNames.splice(index, 1);
    }
    this.cd.detectChanges();
  }

  get_services() {
    this.apidata.get_services().subscribe({
      next: (res: ServiceResponse) => {
        this.services = res.data;
        this.filteredServices = [...res.data];
        console.log('Available services:', this.services);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
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
      !this.selectedServices.length
    ) {
      alert('Please fill all required fields and select at least one service!');
      return;
    }

    // Prepare data for backend - Match Postman format
    const payload = {
      userName: this.staffData.userName,
      phone_number: this.staffData.phone_number,
      experience: this.staffData.experience,
      address: this.staffData.address,
      description: this.staffData.description,
      Service_Name: this.staffData.serviceNames
    };

    console.log('Sending payload to backend:', payload);
    console.log('Selected services details:', this.selectedServices);

    this.staffService.createStaff(payload).subscribe({
      next: (res) => {
        console.log('Staff created successfully:', res);
        alert('Staff created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating staff:', error);
        console.error('Error details:', error.error);
        
        let errorMessage = 'Error creating staff. ';
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

  resetForm() {
    this.staffData = {
      userName: '',
      phone_number: '',
      experience: '',
      address: '',
      description: '',
      serviceIds: [],
      serviceNames: []
    };
    this.searchText = '';
    this.dropdownOpen = false;
    this.filteredUsers = [...this.userdata];
    this.selectedServices = [];
    this.serviceSearchText = '';
    this.serviceDropdownOpen = false;
    this.cd.detectChanges();
  }
}