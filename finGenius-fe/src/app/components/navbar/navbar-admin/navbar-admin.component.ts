import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import Swal from 'sweetalert2';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'navbar-admin',
  standalone: true,
  imports: [ButtonModule, SidebarModule, PanelMenuModule, MenuModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.scss',
})
export class NavbarAdminComponent {
  sidebarVisible: boolean = false;
  items: MenuItem[] = [];
  itemsNavAdmin: MenuItem[] = [];

  constructor(
    private readonly router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Data User',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigateByUrl('/dashboard');
          this.sidebarVisible = false;
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
              this.sidebarVisible = false;
            },
          },
          {
            label: 'Kategori',
            icon: 'pi pi-cloud-upload',
            command: () => {
              this.router.navigateByUrl('/kategori');
              this.sidebarVisible = false;
            },
          },
        ],
      },
      {
        label: 'Reward',
        icon: 'pi pi-cloud-upload',
        command: () => {
          this.router.navigateByUrl('/reward');
          this.sidebarVisible = false;
        },
      },
    ];

    this.itemsNavAdmin = [
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.destroyToken();
      }
    });
  }
}
