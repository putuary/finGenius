import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'navbar-common',
  standalone: true,
  imports: [MenuModule, ButtonModule, RouterLink],
  templateUrl: './navbar-common.component.html',
  styleUrl: './navbar-common.component.scss',
})
export class NavbarCommonComponent {
  items: MenuItem[] | undefined;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Sign In',
        icon: 'pi pi-sign-in',
        command: () => {
          this.router.navigate(['/login']);
        },
      },
      {
        label: 'Sign Up',
        icon: 'pi pi-user-plus',
        command: () => {
          this.router.navigate(['/register']);
        },
      },
    ];
  }
}
