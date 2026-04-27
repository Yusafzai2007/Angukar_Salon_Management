import { Component, OnInit } from '@angular/core';
import { Service } from '../dashboard/service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Userdata, UsersResponse } from '../../data_type/signup';
import { single_Userdata, single_UsersResponse } from '../../data_type/single_user';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser implements OnInit {
  showPassword = false;
  isEditMode = false; // Track if we're in edit mode
  userId: string | null = null; // Store user ID for edit

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  setStatus(value: 'active' | 'inactive') {
    this.addusers.status = value;
  }

  addusers = {
    userName: '',
    email: '',
    password: '',
    role: '',
    status: '',
  };

  constructor(
    private service: Service,
    private router: Router,
    private active: ActivatedRoute,
  ) {}

  single_user_data: single_Userdata | null = null;

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    const productId = this.active.snapshot.paramMap.get('id');
    console.log('product ID:', productId);

    if (productId) {
      this.isEditMode = true;
      this.userId = productId;

      this.service.single_user(productId).subscribe((res: single_UsersResponse) => {
        console.log('single user data:', res);
        this.single_user_data = res.data;
        // Populate the form with existing user data
        if (this.single_user_data) {
          Object.assign(this.addusers, {
            userName: this.single_user_data.userName || '',
            email: this.single_user_data.email || '',
            role: this.single_user_data.role || '',
            status: this.single_user_data.status || '',
          });
        }
      });
    } else {
      this.isEditMode = false;
    }
  }

  onsubmit() {
    // For edit mode, password is optional
    if (this.isEditMode) {
      if (
        !this.addusers.userName ||
        !this.addusers.email ||
        !this.addusers.role ||
        !this.addusers.status
      ) {
        alert('Username, Email, Role and Status are required');
        return;
      }
    } else {
      // For create mode, all fields including password are required
      if (
        !this.addusers.userName ||
        !this.addusers.email ||
        !this.addusers.password ||
        !this.addusers.role ||
        !this.addusers.status
      ) {
        alert('All fields are required');
        return;
      }
    }

    if (this.isEditMode && this.userId) {
      // UPDATE USER
      this.service.updateUser(this.userId, this.addusers).subscribe({
        next: (res) => {
          console.log(res);
          alert('User updated successfully');
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.log(err);
          alert('Error updating user');
        },
      });
    } else {
      // CREATE NEW USER
      this.service.addUser(this.addusers).subscribe({
        next: (res) => {
          console.log(res);
          alert('User added successfully');
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.log(err);
          alert('Error adding user');
        },
      });
    }
  }
}
