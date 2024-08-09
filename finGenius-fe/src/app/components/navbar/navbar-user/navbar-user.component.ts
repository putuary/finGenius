import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss',
})
export class NavbarUserComponent {

}
