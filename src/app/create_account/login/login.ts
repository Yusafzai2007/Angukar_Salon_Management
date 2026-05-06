import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../account_service/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ MUST ADD THIS
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userlogin = {
    email: 'ali@gmail.com',
    password: '123',
  };

  constructor(private service: Account,private router: Router) {}

  onSubmit() {
    if (!this.userlogin.email || !this.userlogin.password) {
      alert('Please fill all fields');
      return;
    }
      this.service.login(this.userlogin).subscribe({
        next: (res) => {
          console.log(res);
          alert('Login successful');
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.log(err);
          alert('Login failed');
        },
      });
  }
}
