import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { DatePipe } from '@angular/common';
let hideBtn = document.createElement('button');
hideBtn.className = `float-right px-2 py-2 text-white transition-all bg-yellow-400 rounded-md hover:bg-blue-600`;
hideBtn.setAttribute('click', 'isShowContent = false');
hideBtn.textContent = 'Hide';
@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss',
})
export class AllPostsComponent implements OnInit {
  isShowContent: boolean = false;
  postService = inject(PostService);
  postData: any;
  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      this.postData = val;
    });
  }
  OnEditing(): boolean {
    return (this.postService.editMode = true);
  }
  onAdding(): boolean {
    return (this.postService.editMode = false);
  }
  onDelete(id: string, postImg: any) {
    this.postService.deleteImage(postImg, id);
  }
  isFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };
    this.postService.markFeatured(id, featuredData);
  }
  showContent() {
    this.isShowContent = true;
  }
  hidebtn = hideBtn;
}
