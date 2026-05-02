import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiData } from '../api-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddService, ServiceData } from '../../../data_type/service/servicetype';
import { CategoryService } from '../../../service_category/services_data/category-service';
import { Category, CategoryResponse } from '../../../data_type/category/category_service';

@Component({
  selector: 'app-service-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-add.html',
  styleUrl: './service-add.css',
})
export class ServiceAdd implements OnInit {
  add_service: AddService = {
    Service_Name: '',
    price: '',
    discount: '',
    final_price: '',
    duration: '',
    description: '',
    service_category_name: '',
  };

  selectImage: File[] = [];
  errormessage: string = '';
  categoryData: Category[] = [];
  filteredCategories: Category[] = [];
  searchCategory: string = '';

  constructor(
    private service: ApiData,
    private categoryservice: CategoryService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getCategoryData();
  }

  getCategoryData() {
    this.categoryservice.get_service_category().subscribe((res: CategoryResponse) => {
      if (res.success) {
        this.categoryData = res.data;
        this.filteredCategories = res.data;
      }
    });
  }

  filterCategories() {
    const search = this.searchCategory.trim().toLowerCase();
    if (!search) {
      this.filteredCategories = this.categoryData;
      return;
    }
    this.filteredCategories = this.categoryData.filter((cat) =>
      cat.service_category_name.toLowerCase().includes(search)
    );
  }

  selectCategory(cat: Category) {
    this.add_service.service_category_name = cat.service_category_name;
    this.searchCategory = cat.service_category_name;
    this.filteredCategories = [];
  }

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
      !this.add_service.service_category_name ||
      !this.add_service.description ||
      !this.add_service.discount ||
      !this.add_service.duration ||
      !this.add_service.final_price ||
      !this.add_service.price
    ) {
      alert('Please fill all the fields');
      return;
    }

    const formdata = new FormData();
    formdata.append('Service_Name', this.add_service.Service_Name);
    formdata.append('price', this.add_service.price);
    formdata.append('discount', this.add_service.discount);
    formdata.append('final_price', this.add_service.final_price);
    formdata.append('duration', this.add_service.duration);
    formdata.append('description', this.add_service.description);
    formdata.append('service_category_name', this.add_service.service_category_name);

    this.selectImage.forEach((file) => {
      formdata.append('service_Image', file);
    });

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
          service_category_name: '',
        };
        this.selectImage = [];
        this.searchCategory = '';
        this.filteredCategories = this.categoryData;
      },
      error: (err) => {
        console.error('Error creating service:', err);
        alert('Failed to create service. Please try again.');
      },
    });
  }
}