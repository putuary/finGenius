import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
