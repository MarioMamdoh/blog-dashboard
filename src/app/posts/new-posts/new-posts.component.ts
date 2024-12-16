import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { NgClass } from '@angular/common';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-posts',
  standalone: true,
  imports: [EditorModule, ReactiveFormsModule, NgClass],
  templateUrl: './new-posts.component.html',
  styleUrl: './new-posts.component.scss',
})
export class NewPostsComponent implements OnInit {
  postService = inject(PostService);
  postForm: FormGroup;
  categoryService = inject(CategoryService);
  categoryData: Category[] = [];
  formatTitle = '';
  permalinkValue = '';
  imgUrl: any = '../../../assets/placeholder-image.webp';
  selectedImg: any;
  route = inject(ActivatedRoute);
  postEditing: any;
  formStatus = 'Add New';
  postId = '';
  constructor(private fb: FormBuilder) {
    this.route.queryParams.subscribe((val) => {
      this.postId = val['id'];
      this.postService.loadEditData(val['id']).subscribe((val) => {
        this.postEditing = val;

        if (this.postService.editMode === true) {
          this.postForm = this.fb.group({
            title: [
              this.postEditing.title,
              [Validators.required, Validators.minLength(5)],
            ],
            permalink: [this.postEditing.permalink],
            excerpt: [this.postEditing.excerpt],
            category: [
              `${this.postEditing.category.id}-${this.postEditing.category.data}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [
              this.postEditing.content,
              [Validators.required, Validators.minLength(20)],
            ],
          });

          this.imgUrl = this.postEditing.postImgPath;
          this.formStatus = 'Edit';
        }
      });
    });
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      permalink: [''],
      excerpt: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(20)]],
    });
  }
  ngOnInit(): void {
    this.categoryService.getData().subscribe((val) => {
      this.categoryData = val;
    });
  }
  onSubmit() {
    let categoryInfoSplit = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      excerpt: this.postForm.value.excerpt,
      category: {
        id: categoryInfoSplit[0],
        data: categoryInfoSplit[1],
      },
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: new Date(),
    };

    this.postService.uploadImage(
      this.selectedImg,
      postData,
      this.formStatus,
      this.postId
    );
    this.postForm.reset();
    this.imgUrl = '../../../assets/placeholder-image.webp';
    console.log(this.postForm.value);
  }
  categoryInfo() {}
  onChangeTitle(event: any) {
    let value = event.target.value;
    let format = value.replaceAll(' ', '-');
    this.permalinkValue = format;
  }
  onChangeURL(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgUrl = e.target?.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImg = event.target.files[0];
  }
}
