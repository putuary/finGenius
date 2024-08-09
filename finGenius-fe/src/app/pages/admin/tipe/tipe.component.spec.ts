import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TipeComponent } from './tipe.component';

fdescribe('TipeComponent', () => {
  let component: TipeComponent;
  let fixture: ComponentFixture<TipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipeComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
