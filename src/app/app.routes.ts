import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

// Importa las rutas de autenticación
import authRoutes from './pages/auth/features/auth.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirige a 'home' en lugar de '/'
  { path: 'home', component: HomeComponent },  
  { path: 'contacts', loadChildren: () => import('./features/contacts/contacts.routes').then(m => m.default) },

  // Agrega las rutas de autenticación aquí
  ...authRoutes,  

  // Cargar ProfileComponent como Standalone
  { 
    path: 'profile', 
    loadComponent: () => import('./components/profile-settings/profile-settings.component')
      .then(m => m.ProfileSettingsComponent) 
  },

  { path: '**', redirectTo: 'home' }  // Redirige a 'home' si no encuentra la ruta
];
