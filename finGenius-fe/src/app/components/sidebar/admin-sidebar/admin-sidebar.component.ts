import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  items: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Data User',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigateByUrl('/dashboard');
        },
      },
      {
        label: 'Financial Record',
        icon: 'pi pi-list-check',
        items: [
          {
            label: 'Tipe',
            icon: 'pi pi-cloud-download',
            command: () => {
              this.router.navigateByUrl('/tipe');
            },
          },
          {
            label: 'Kategori',
            icon: 'pi pi-cloud-upload',
            command: () => {
              this.router.navigateByUrl('/kategori');
            },
          },
        ],
      },
      {
        label: 'Reward',
        icon: 'pi pi-cloud-upload',
        command: () => {
          this.router.navigateByUrl('/reward');
        },
      },
    ];
  }
}
