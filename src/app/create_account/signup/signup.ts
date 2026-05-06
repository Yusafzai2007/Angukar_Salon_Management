import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../account_service/account';

@Component({
  selector: 'app-signup',
  standalone: true, // ✅ MUST ADD THIS
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  showPassword = false;

  userlogin = {
    userName: '',
    email: '',
    password: '',
  };

  constructor(private service: Account) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log("Button clicked"); // ✅ test

    if (!this.userlogin.userName || !this.userlogin.email || !this.userlogin.password) {
      alert('Please fill all fields');
      return;
    }

    this.service.signup(this.userlogin).subscribe({
      next: (res) => {
        console.log(res);
        alert('Signup successful');
      },
      error: (err) => {
        console.log(err);
        alert('Signup failed');
      }
    });
  }
}