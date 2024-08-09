import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCommonComponent } from './navbar-common.component';

describe('NavbarCommonComponent', () => {
  let component: NavbarCommonComponent;
  let fixture: ComponentFixture<NavbarCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
