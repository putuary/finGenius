import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form group', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should have a form control', () => {
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('fullname')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });

  it('should mark form as invalid when submitted with empty fields', () => {
    component.registerForm.reset();
    fixture.detectChanges();

    component.onRegister();

    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should mark email as invalid for missing "@" symbol', () => {
    const emailControl: any = component.registerForm.get('email');
    emailControl.setValue('test.com');

    expect(emailControl.invalid).toBeTruthy();
  });

  it('should mark email as invalid for invalid domain', () => {
    const emailControl: any = component.registerForm.get('email');
    emailControl.setValue('test@invaliddomain');

    expect(emailControl.invalid).toBeTruthy();
  });

  it('should mark password as invalid for short password', () => {
    const passwordControl: any = component.registerForm.get('password');
    passwordControl.setValue('short');

    expect(passwordControl.invalid).toBeTruthy();
  });

  it('should mark password as invalid for simple password', () => {
    const passwordControl: any = component.registerForm.get('password');
    passwordControl.setValue('password123');

    expect(passwordControl.invalid).toBeTruthy();
  });
});
