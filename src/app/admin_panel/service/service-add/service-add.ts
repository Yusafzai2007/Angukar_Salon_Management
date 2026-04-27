import { Component } from '@angular/core';
import { ApiData } from '../api-data';
import { add_Service } from '../../../data_type/service/servicetype';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-add.html',
  styleUrl: './service-add.css',
})
export class ServiceAdd {
  add_service: add_Service = {
    Service_Name: '',
    price: '',
    discount: '',
    final_price: '',
    duration: '',
    description: '',
    category: '',
  };

  selectImage: File[] = [];

  errormessage: string = '';

  constructor(private service: ApiData) {}

  onfilechange(event: any) {
    const file = Array.from(event.target.files);

    if (file.length < 3) {
      this.errormessage = 'Please select at least 3 images.';
      this.selectImage = [];
      return;
    }

    this.errormessage = '';
    this.selectImage = file as File[];
  }

  submitservices() {
    if (this.selectImage.length < 3) {
      this.errormessage = 'Please select at least 3 images.';
      return;
    }

    if (
      !this.add_service.Service_Name ||
      !this.add_service.category ||
      !this.add_service.description ||
      !this.add_service.discount ||
      !this.add_service.duration ||
      !this.add_service.final_price ||
      !this.add_service.price
    ) {
      alert('Please fill all the fields');
      return;
    }

    // Here you can handle the form submission, e.g., send the data to a server or display it in the console
    console.log('Service Details:', this.add_service);
    console.log('Selected Images:', this.selectImage);

    const formdata = new FormData();

    formdata.append('Service_Name', this.add_service.Service_Name);
    formdata.append('price', this.add_service.price);
    formdata.append('discount', this.add_service.discount);
    formdata.append('final_price', this.add_service.final_price);
    formdata.append('duration', this.add_service.duration);
    formdata.append('description', this.add_service.description);
    formdata.append('category', this.add_service.category);

    this.selectImage.forEach((file) => {
      formdata.append('service_Image', file);
    });

    console.log('Submitting...', formdata);

    this.service.create_service(formdata).subscribe({
      next: (res) => {
        console.log('Service created successfully:', res);
        alert('Service created successfully!');
        this.add_service = {
          Service_Name: '',
          price: '',
          discount: '',
          final_price: '',
          duration: '',
          description: '',
          category: '',
        };
        this.selectImage = [];
      },
      error: (err) => {
        console.error('Error creating service:', err);
        alert('Failed to create service. Please try again.');
      },
    });
  }
}
