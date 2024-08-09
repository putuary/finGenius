import { Routes } from '@angular/router';
import { LoginComponent } from './pages/common/login/login.component';
import { RegisterComponent } from './pages/common/register/register.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { authGuard } from './guard/auth.guard';
import { ForgotPasswordComponent } from './pages/common/forgot-password/forgot-password.component';
import { Role } from './types/User.interface';
import { ForbiddeComponent } from './pages/error/forbidde/forbidde.component';
import { NotFoundPageComponent } from './pages/error/not-found-page/not-found-page.component';
import { ResetPasswordComponent } from './pages/common/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    title: 'FinGenius',
    loadComponent: () =>
      import('./pages/common/landing/landing-page.component').then(
        (com) => com.LandingPageComponent
      ),
  },
  {
    path: 'login',
    title: 'Login | FinGenius',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password | FinGenius',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password/:token',
    title: 'Reset Password | FinGenius',
    component: ResetPasswordComponent,
  },
  {
    path: 'register',
    title: 'Register | FinGenius',
    component: RegisterComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    data: {
      role: Role.ADMIN,
    },
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard | FinGenius',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard.component').then(
            (com) => com.DashboardComponent
          ),
      },
      {
        path: 'tipe',
        title: 'Tipe | FinGenius',
        loadComponent: () =>
          import('./pages/admin/tipe/tipe.component').then(
            (com) => com.TipeComponent
          ),
      },
      {
        path: 'kategori',
        title: 'Kategori | FinGenius',
        loadComponent: () =>
          import('./pages/admin/kategori/kategori.component').then(
            (com) => com.KategoriComponent
          ),
      },
      {
        path: 'kategori/add',
        title: 'Add Kategori | FinGenius',
        loadComponent: () =>
          import('./pages/admin/kategori/add/add.component').then(
            (com) => com.AddComponent
          ),
      },
      {
        path: 'kategori/update/:id',
        title: 'Update Kategori | FinGenius',
        loadComponent: () =>
          import('./pages/admin/kategori/update/update.component').then(
            (com) => com.UpdateComponent
          ),
      },
      {
        path: 'reward',
        title: 'Reward | FinGenius',
        loadComponent: () =>
          import('./pages/admin/reward/reward.component').then(
            (com) => com.RewardComponent
          ),
      },
      {
        path: 'reward/add',
        title: 'Add Reward | FinGenius',
        loadComponent: () =>
          import('./pages/admin/reward/add/add.component').then(
            (com) => com.AddComponent
          ),
      },
      {
        path: 'reward/update/:id',
        title: 'Update Reward | FinGenius',
        loadComponent: () =>
          import('./pages/admin/reward/update/update.component').then(
            (com) => com.UpdateComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    data: {
      role: Role.USER,
    },
    children: [
      {
        path: 'home',
        title: 'Home | FinGenius',
        loadComponent: () =>
          import('./pages/user/home/home.component').then(
            (com) => com.HomeComponent
          ),
      },
      {
        path: 'profile',
        title: 'Profile | FinGenius',
        loadComponent: () =>
          import('./pages/user/profile/profile.component').then(
            (com) => com.ProfileComponent
          ),
      },
      {
        path: 'profile/streak',
        title: 'Streak | FinGenius',
        loadComponent: () => 
          import('./pages/user/profile/streak/streak.component').then(
            (com) => com.StreakComponent 
          )
      },
      {
        path: 'budget-limit',
        title: 'Budget Limit | FinGenius',
        loadComponent: () =>
          import('./pages/user/budget-limit/budget-limit.component').then(
            (com) => com.BudgetLimitComponent
          ),
      },
      {
        path: 'transaction-logs',
        title: 'Transaction Logs | FinGenius',
        loadComponent: () =>
          import('./pages/user/logs/logs.component').then(
            (com) => com.LogsComponent
          ),
      },
    ],
  },
  {
    path: 'forbidden',
    title: 'Forbidden | FinGenius',
    component: ForbiddeComponent,
  },
  {
    path: '**',
    title: 'Page Not Found | FinGenius',
    component: NotFoundPageComponent,
  },
];
