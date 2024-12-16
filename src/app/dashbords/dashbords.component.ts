import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashbords',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashbords.component.html',
  styleUrl: './dashbords.component.scss',
})
export class DashbordsComponent {}
