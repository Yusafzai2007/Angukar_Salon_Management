import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../services_data/category-service';
import { Category, CategoryResponse } from '../../data_type/category/category_service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fetch-category',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './fetch-category.html',
  styleUrl: './fetch-category.css',
})
export class FetchCategory implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef,
  ) {}

  categoryData: Category[] = [];
  filteredCategoryData: Category[] = [];
  searchTerm: string = '';
  showEditModal: boolean = false;
  editCategoryData: Category = {
    _id: '',
    service_category_name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    __v: 0
  };

  ngOnInit(): void {
    this.getCategoryData();
  }

  getCategoryData() {
    this.categoryService.get_service_category().subscribe((res: CategoryResponse) => {
      if (res.success) {
        this.categoryData = res.data;
        this.filteredCategoryData = [...this.categoryData];
        console.log(this.categoryData);
        this.cd.detectChanges();
      }
    });
  }

  filterCategories() {
    if (!this.searchTerm.trim()) {
      this.filteredCategoryData = [...this.categoryData];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredCategoryData = this.categoryData.filter(
        (category) =>
          category.service_category_name.toLowerCase().includes(searchTermLower) ||
          category.description.toLowerCase().includes(searchTermLower),
      );
    }
    this.cd.detectChanges();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterCategories();
  }

  editCategory(category: Category) {
    this.editCategoryData = { ...category };
    this.showEditModal = true;
  }

  saveEdit() {
    // Prepare the data for update (only send the fields that can be updated)
    const updateData = {
      service_category_name: this.editCategoryData.service_category_name,
      description: this.editCategoryData.description
    };
    
    // Call your update API here
    this.categoryService.update_service_category(this.editCategoryData._id, updateData).subscribe((res: any) => {
      if (res.success) {
        // Update local data
        const index = this.categoryData.findIndex(c => c._id === this.editCategoryData._id);
        if (index !== -1) {
          this.categoryData[index] = { ...this.editCategoryData };
          this.filterCategories();
        }
        this.closeModal();
        this.cd.detectChanges();
      } else {
        // Handle error
        console.error('Failed to update category:', res.message);
        alert('Failed to update category: ' + res.message);
      }
    }, (error) => {
      console.error('Error updating category:', error);
      alert('An error occurred while updating the category');
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      // Call your delete API here
      this.categoryService.delete_service_category(id).subscribe((res: any) => {
        if (res.success) {
          // Remove from local data
          this.categoryData = this.categoryData.filter((c) => c._id !== id);
          this.filterCategories();
          this.cd.detectChanges();
        } else {
          console.error('Failed to delete category:', res.message);
          alert('Failed to delete category: ' + res.message);
        }
      }, (error) => {
        console.error('Error deleting category:', error);
        alert('An error occurred while deleting the category');
      });
    }
  }

  closeModal() {
    this.showEditModal = false;
    this.editCategoryData = {
      _id: '',
      service_category_name: '',
      description: '',
      createdAt: '',
      updatedAt: '',
      __v: 0
    };
  }
}