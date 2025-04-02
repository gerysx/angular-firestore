import { Routes } from '@angular/router';

/**
 * Rutas para el módulo de contactos.
 * 
 * Esta configuración de rutas se encarga de cargar el componente correspondiente
 * cuando el usuario navega a las URLs relacionadas con los contactos.
 */
const contactsRoute: Routes = [
  {
    /**
     * Ruta principal del módulo de contactos.
     * 
     * Esta ruta se carga cuando el usuario navega a la URL '/contacts' (ruta vacía).
     */
    path: '',  // Ruta vacía (por ejemplo, /contacts)

    /**
     * Carga perezosa (lazy loading) del componente ListComponent.
     * 
     * Se carga de manera dinámica cuando se accede a la ruta correspondiente,
     * mejorando el rendimiento al dividir el código.
     */
    loadComponent: () => import('./list/list.component').then(m => m.ListComponent),  
  }
];

export default contactsRoute;
