import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../navbar/navbar-admin/navbar-admin.component';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../sidebar/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NavbarAdminComponent, RouterOutlet, AdminSidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {}
