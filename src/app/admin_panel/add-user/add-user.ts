import { Component } from '@angular/core';
import { Service } from '../dashboard/service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  setStatus(value: 'ACTIVE' | 'DEACTIVE') {
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
  ) {}

  onsubmit() {
    if (
      !this.addusers.userName ||
      !this.addusers.email ||
      !this.addusers.password ||
      !this.addusers.role ||
      !this.addusers.status
    ) {
      alert('all filed are required');
      return;
    }

    this.service.addUser(this.addusers).subscribe({
      next: (res) => {
        console.log(res);
        alert('User added successfully');
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
