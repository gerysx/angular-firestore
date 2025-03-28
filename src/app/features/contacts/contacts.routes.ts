import { Routes } from '@angular/router';

// Definir las rutas para el módulo de contactos
 const contactsRoute: Routes = [
  {
    path: '',  // Ruta vacía (por ejemplo, /contacts)
    loadComponent: () => import('./list/list.component').then(m => m.ListComponent),  // Carga perezosa del componente ListComponent
  }
];

export default contactsRoute;