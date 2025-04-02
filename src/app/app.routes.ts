import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import authRoutes from './pages/auth/features/auth.routes';

/**
 * Rutas principales de la aplicación.
 * Combina las rutas de autenticación, la ruta de inicio, contactos y perfil.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contacts', loadChildren: () => import('./features/contacts/contacts.routes').then(m => m.default) },
  ...authRoutes,
  {
    path: 'profile',
    loadComponent: () => import('./components/profile-settings/profile-settings.component')
      .then(m => m.ProfileSettingsComponent)
  },
  { path: '**', redirectTo: 'home' }
];
