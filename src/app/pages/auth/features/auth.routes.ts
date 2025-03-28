import { Routes } from "@angular/router";

export default [
  {
    path: 'sign-in',
    loadComponent: () => import ('./sign-in/sign-in.component'), // Carga del componente de inicio de sesión
  },
  {
    path: 'sign-up',
    loadComponent: () => import ('./sign-up/sign-up.component'), // Carga del componente de registro
  }
] as Routes;
