import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiData } from '../api-data';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryResponse } from '../../../data_type/category/category_service';
import { CategoryService } from '../../../service_category/services_data/category-service';
import { SingleServiceResponse } from '../../../data_type/service/edit_services';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-service.html',
  styleUrls: ['./edit-service.css']
})
export class EditService implements OnInit {
  serviceId: string = '';
  
  edit_service = {
    Service_Name: '',
    price: '',
    discount: '',
    final_price: '',
    duration: '',
    description: '',
    service_category_name: '',
  };

  // Existing images from server
  existingImages: string[] = [];
  removedImages: string[] = [];
  
  // New images to upload
  newImages: File[] = [];
  newImagePreviews: string[] = []; // Store preview URLs
  errormessage: string = '';
  
  // Category related
  categoryData: Category[] = [];
  filteredCategories: Category[] = [];
  searchCategory: string = '';
  categoryDropdownOpen: boolean = false;
  
  // Loading state
  isLoading: boolean = true;

  constructor(
    private service: ApiData,
    private active: ActivatedRoute,
    private router: Router,
    private categoryservice: CategoryService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.serviceId = this.active.snapshot.paramMap.get('id') || '';
    console.log('Service ID:', this.serviceId);
    
    if (this.serviceId) {
      this.getCategoryData();
      this.loadServiceData();
    } else {
      console.error('No service ID found');
      alert('Invalid service ID');
      this.router.navigate(['/services']);
    }
  }

  getCategoryData() {
    this.categoryservice.get_service_category().subscribe({
      next: (res: CategoryResponse) => {
        if (res.success) {
          this.categoryData = res.data;
          this.filteredCategories = res.data;
          this.cd.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  loadServiceData() {
    this.service.get_service_by_id(this.serviceId).subscribe({
      next: (res: SingleServiceResponse) => {
        console.log('Service data:', res);
        
        if (res.success && res.data) {
          const service = res.data;
          
          // Populate form fields
          this.edit_service.Service_Name = service.Service_Name;
          this.edit_service.price = service.price;
          this.edit_service.discount = service.discount;
          this.edit_service.final_price = service.final_price;
          this.edit_service.duration = service.duration;
          this.edit_service.description = service.description;
          this.edit_service.service_category_name = service.category?.service_category_name || '';
          this.searchCategory = service.category?.service_category_name || '';
          
          // Store existing images
          this.existingImages = service.service_Image || [];
          
          console.log('Loaded service data:', this.edit_service);
          console.log('Existing images:', this.existingImages);
          
          this.isLoading = false;
          this.cd.detectChanges();
        } else {
          console.error('Failed to load service data');
          alert('Failed to load service data');
          this.router.navigate(['/services']);
        }
      },
      error: (error) => {
        console.error('Error loading service:', error);
        alert('Error loading service data');
        this.isLoading = false;
        this.router.navigate(['/services']);
      }
    });
  }

  filterCategories() {
    const search = this.searchCategory.trim().toLowerCase();
    if (!search) {
      this.filteredCategories = this.categoryData;
    } else {
      this.filteredCategories = this.categoryData.filter((cat) =>
        cat.service_category_name.toLowerCase().includes(search)
      );
    }
    this.categoryDropdownOpen = true;
    this.cd.detectChanges();
  }

  selectCategory(cat: Category) {
    this.edit_service.service_category_name = cat.service_category_name;
    this.searchCategory = cat.service_category_name;
    this.categoryDropdownOpen = false;
    this.filteredCategories = [];
    this.cd.detectChanges();
  }

  closeCategoryDropdown() {
    setTimeout(() => {
      this.categoryDropdownOpen = false;
      this.filteredCategories = [];
    }, 200);
  }

  onfilechange(event: any) {
    const files = Array.from(event.target.files) as File[];
    
    if (files.length === 0) {
      return;
    }
    
    this.errormessage = '';
    this.newImages = files;
    
    // Create preview URLs for new images
    this.newImagePreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newImagePreviews.push(e.target.result);
        this.cd.detectChanges();
      };
      reader.readAsDataURL(file);
    });
    
    console.log('New images to upload:', this.newImages);
  }

  removeExistingImage(index: number) {
    const removedImage = this.existingImages[index];
    this.existingImages.splice(index, 1);
    this.removedImages.push(removedImage);
    console.log('Image removed, remaining:', this.existingImages);
    this.cd.detectChanges();
  }

  removeNewImage(index: number) {
    this.newImages.splice(index, 1);
    this.newImagePreviews.splice(index, 1);
    console.log('New image removed, remaining:', this.newImages);
    this.cd.detectChanges();
  }

  updateService() {
    // Validation
    if (
      !this.edit_service.Service_Name ||
      !this.edit_service.service_category_name ||
      !this.edit_service.description ||
      !this.edit_service.duration ||
      !this.edit_service.final_price ||
      !this.edit_service.price
    ) {
      alert('Please fill all the required fields!');
      return;
    }

    // Check if there are any images (existing or new)
    if (this.existingImages.length === 0 && this.newImages.length === 0) {
      this.errormessage = 'At least one image is required!';
      return;
    }

    const formdata = new FormData();
    formdata.append('Service_Name', this.edit_service.Service_Name);
    formdata.append('price', this.edit_service.price);
    formdata.append('discount', this.edit_service.discount);
    formdata.append('final_price', this.edit_service.final_price);
    formdata.append('duration', this.edit_service.duration);
    formdata.append('description', this.edit_service.description);
    formdata.append('service_category_name', this.edit_service.service_category_name);
    
    // Send existing images to keep
    this.existingImages.forEach((imageUrl) => {
      formdata.append('existing_images', imageUrl);
    });
    
    // Send removed images to delete from server
    this.removedImages.forEach((removedImage) => {
      formdata.append('removed_images', removedImage);
    });
    
    // Append new images
    this.newImages.forEach((file) => {
      formdata.append('service_Image', file);
    });

    console.log('Updating service with FormData');
    
    this.service.update_service(this.serviceId, formdata).subscribe({
      next: (res: SingleServiceResponse) => {
        console.log('Service updated successfully:', res);
        if (res.success) {
          alert('Service updated successfully!');
          this.router.navigate(['/services']);
        } else {
          alert('Failed to update service: ' + res.message);
        }
      },
      error: (error) => {
        console.error('Error updating service:', error);
        let errorMessage = 'Failed to update service. ';
        if (error.error?.message) {
          errorMessage += error.error.message;
        }
        alert(errorMessage);
      },
    });
  }

  cancel() {
    this.router.navigate(['/services']);
  }
}