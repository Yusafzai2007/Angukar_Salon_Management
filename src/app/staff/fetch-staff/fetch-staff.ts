import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../staff/data';
import { ApiResponse, Staff } from '../data_staff';
import { RouterLink } from '@angular/router';
import { AddStaff } from "../add-staff/add-staff";

@Component({
  selector: 'app-fetch-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AddStaff],
  templateUrl: './fetch-staff.html',
  styleUrl: './fetch-staff.css',
})
export class FetchStaff implements OnInit {
  constructor(
    private data: Data,
    private cd: ChangeDetectorRef,
  ) {}

  get_staff_data: Staff[] = [];
  filteredStaffData: Staff[] = [];
  showServiceModal: boolean = false;
  selectedStaff: Staff | null = null;

  filters = {
    username: '',
    email: '',
    phoneNumber: '',
    experience: '',
    serviceName: '',
  };

  ngOnInit() {
    this.get_staff();
  }

  get_staff() {
    this.data.getStaff().subscribe({
      next: (res: ApiResponse) => {
        if (res.success) {
          this.get_staff_data = res.message;
          this.filteredStaffData = [...this.get_staff_data];
          console.log('get_data', this.get_staff_data);
          this.cd.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching staff:', error);
      },
    });
  }

  applyFilters() {
    this.filteredStaffData = this.get_staff_data.filter((staff) => {
      // Username filter
      const usernameMatch =
        !this.filters.username ||
        staff.user_id.userName.toLowerCase().includes(this.filters.username.toLowerCase());

      // Email filter
      const emailMatch =
        !this.filters.email ||
        staff.user_id.email.toLowerCase().includes(this.filters.email.toLowerCase());

      // Phone number filter
      const phoneMatch =
        !this.filters.phoneNumber || staff.phone_number.includes(this.filters.phoneNumber);

      // Experience filter
      const experienceMatch =
        !this.filters.experience || staff.experience.toString().includes(this.filters.experience);

      // Service name filter
      let serviceMatch = true;
      if (this.filters.serviceName) {
        serviceMatch = staff.service_id.some((service) =>
          service.Service_Name.toLowerCase().includes(this.filters.serviceName.toLowerCase()),
        );
      }

      return usernameMatch && emailMatch && phoneMatch && experienceMatch && serviceMatch;
    });
  }

  clearFilters() {
    this.filters = {
      username: '',
      email: '',
      phoneNumber: '',
      experience: '',
      serviceName: '',
    };
    this.filteredStaffData = [...this.get_staff_data];
  }

  openServiceModal(staff: Staff) {
    this.selectedStaff = staff;
    this.showServiceModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeServiceModal() {
    this.showServiceModal = false;
    this.selectedStaff = null;
    document.body.style.overflow = '';
  }

  editStaff(staff: Staff) {
    console.log('Edit staff:', staff);
    // Add your edit logic here
    alert(`Edit functionality for ${staff.user_id.userName}`);
  }

  deleteStaff(staff: Staff) {
    if (confirm(`Are you sure you want to delete ${staff.user_id.userName}?`)) {
      console.log('Delete staff:', staff);
      // Add your delete logic here
      alert(`Delete functionality for ${staff.user_id.userName}`);
    }
  }

  tableheaders = [
    'S.No',
    'User Details',
    'Phone Number',
    'Experience',
    'Address',
    'Services',
    'Created At',
    'Updated At',
    'Actions',
  ];

  deleteStaffById(id: string) {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.data.deleteStaff(id).subscribe({
        next: (res) => {
          alert('Staff member deleted successfully');
          this.get_staff(); // Refresh the staff list after deletion
        },
        error: (error) => {
          console.error('Error deleting staff member:', error);
          alert('Failed to delete staff member');
        },
      });
    }
  }
}
