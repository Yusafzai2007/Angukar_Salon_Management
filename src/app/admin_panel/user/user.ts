import { Component, OnInit } from '@angular/core';
import { Userdata, UsersResponse } from '../../data_type/signup';
import { Service } from '../dashboard/service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User implements OnInit {
  userdata: Userdata[] = [];
  filteredUserdata: Userdata[] = [];

  // Filter properties
  filters = {
    username: '',
    email: '',
    role: '',
    status: '',
  };

  // Available options for dropdowns
  roleOptions = ['', 'admin', 'customer', 'staff'];
  statusOptions = ['', 'active', 'inactive'];

  constructor(
    private service: Service,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.get_data();
  }

  get_data() {
    this.service.get_users().subscribe((res: UsersResponse) => {
      this.userdata = res.data;
      this.filteredUserdata = [...this.userdata];
      console.log(this.userdata);
      this.cd.detectChanges();
    });
  }

  // Apply filters
  applyFilters() {
    this.filteredUserdata = this.userdata.filter((user) => {
      const matchesUsername =
        !this.filters.username ||
        user.userName?.toLowerCase().includes(this.filters.username.toLowerCase());

      const matchesEmail =
        !this.filters.email || user.email?.toLowerCase().includes(this.filters.email.toLowerCase());

      const matchesRole = !this.filters.role || user.role === this.filters.role;

      const matchesStatus = !this.filters.status || user.status === this.filters.status;

      return matchesUsername && matchesEmail && matchesRole && matchesStatus;
    });
    this.cd.detectChanges();
  }

  // Reset all filters
  resetFilters() {
    this.filters = {
      username: '',
      email: '',
      role: '',
      status: '',
    };
    this.filteredUserdata = [...this.userdata];
    this.cd.detectChanges();
  }

  editUser(user: Userdata) {
    console.log('Edit user:', user);
  }

  deleteuser: Userdata | null = null;

  confirmdelete(UserId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(UserId).subscribe({
        next: (res) => {
          console.log(res);
          alert('User deleted successfully');

          // UI update (important)
          this.get_data(); // ya filter se remove karo
        },
        error: (err) => {
          console.log(err);
          alert('Delete failed');
        },
      });
    }
  }

  tableheader = [
    'S.No',
    'Username',
    'Email',
    'Role',
    'Status',
    'Created At',
    'Updated At',
    'Actions',
  ];
}
