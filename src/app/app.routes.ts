import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

// Importa las rutas de autenticación
import authRoutes from './pages/auth/features/auth.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'home', component: HomeComponent },  
  { path: 'contacts', loadChildren: () => import('./features/contacts/contacts.routes') },

  // Agrega las rutas de autenticación aquí
  ...authRoutes,  

  // Cargar ProfileComponent como Standalone
  { 
    path: 'profile', 
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) 
  },

  { path: '**', redirectTo: '/' }
];
