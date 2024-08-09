import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavbarCommonComponent } from '../../../components/navbar/navbar-common/navbar-common.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ButtonModule, NavbarCommonComponent, FooterComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('slideInFromLeftSvg', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-5rem) translateY(-5rem)' }),
        animate(
          '1.5s ease-in-out',
          style({ opacity: 1, transform: 'translateX(0%)' })
        ),
      ]),
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-5rem)' }),
        animate(
          '1s ease-in-out',
          style({ opacity: 1, transform: 'translateX(0%)' })
        ),
      ]),
    ]),
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.8) translateY(-5rem)' }),
        animate(
          '1s ease-in-out',
          style({ opacity: 1, transform: 'scale(1.1) translateX(0%)' })
        ),
        animate('0.4s ease-in-out', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class LandingPageComponent {}
