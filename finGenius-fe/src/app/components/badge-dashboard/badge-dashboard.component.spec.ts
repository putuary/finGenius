import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeDashboardComponent } from './badge-dashboard.component';

describe('BadgeDashboardComponent', () => {
  let component: BadgeDashboardComponent;
  let fixture: ComponentFixture<BadgeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
