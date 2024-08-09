import { Component } from '@angular/core';
import { NavbarUserComponent } from '../navbar/navbar-user/navbar-user.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [NavbarUserComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {}
