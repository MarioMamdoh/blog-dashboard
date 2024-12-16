import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, JsonPipe, NgClass, NgFor } from '@angular/common';

import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, NgClass, JsonPipe, CommonModule, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categoryService = inject(CategoryService);
  categoryId: string = '';
  DataValue: Category[] = [];
  inputText: string = '';
  formStatus: string = 'Add';
  ngOnInit(): void {
    this.categoryService.getData().subscribe((val) => {
      this.DataValue = val;
    });
  }
  onSubmit(formData: NgForm) {
    let categoryData = {
      category: formData.value.category,
    };
    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      this.formStatus = 'Add';
    }
    formData.reset();
  }
  onEdit(category: string, id: string) {
    this.inputText = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }
  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
