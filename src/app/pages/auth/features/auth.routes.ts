import { Routes } from '@angular/router';

/**
 * Definición de las rutas del módulo de autenticación.
 * Este archivo contiene las rutas para las páginas de inicio de sesión, registro
 * y restablecimiento de contraseña, utilizando carga perezosa.
 */
export default [
  /**
   * Ruta para el inicio de sesión del usuario.
   * Carga el componente de inicio de sesión cuando se navega a '/sign-in'.
   */
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.component'),
  },
  /**
   * Ruta para el registro de usuario.
   * Carga el componente de registro cuando se navega a '/sign-up'.
   */
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.component'),
  },
  /**
   * Ruta para la recuperación de contraseña.
   * Carga el componente de restablecimiento de contraseña cuando se navega a '/reset-password'.
   */
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.component')
      .then((m) => m.ResetPasswordComponent),
  },
] as Routes;
