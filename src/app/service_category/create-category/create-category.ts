import { Component } from '@angular/core';
import { CategoryService } from '../services_data/category-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
})
export class CreateCategory {
  create_form = {
    service_category_name: '',
    description: '',
  };

  constructor(private service: CategoryService) {}

onsubmit() {
  if (!this.create_form.service_category_name || !this.create_form.description) {
    alert('all filed are required');
    return;
  }

  this.service.create_service(this.create_form).subscribe({
    next: (res) => {
      console.log(res);
      alert('success');

      // ✅ FIX
      this.create_form.service_category_name = '';
      this.create_form.description = '';
    },
    error: (err) => {
      console.log(err);
    },
  });
}
}
