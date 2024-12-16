import { Routes } from '@angular/router';
import { DashbordsComponent } from './dashbords/dashbords.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostsComponent } from './posts/new-posts/new-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { guardGuard } from './services/guard.guard';

export const routes: Routes = [
  { path: '', component: DashbordsComponent, canActivate: [guardGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [guardGuard],
  },
  { path: 'posts', component: AllPostsComponent, canActivate: [guardGuard] },
  {
    path: 'posts/new',
    component: NewPostsComponent,
    canActivate: [guardGuard],
  },
];
