import { Category } from './category';

export interface Post {
  title: string;
  permalink: string;
  category: Category;
  postImgPath: string;
  content: string;
  excerpt: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createAt: Date;
}
