import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../pages/auth/data-access/auth.service';

/**
 * Guarda de autenticación para proteger rutas privadas.
 * Si el usuario está autenticado, redirige a la página de inicio.
 * Si no está autenticado, permite el acceso.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Verifica si el usuario está autenticado usando el AuthService.
   * Si el usuario está autenticado, permite la navegación,
   * si no lo está, lo redirige a la página de inicio de sesión.
   */
  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Aquí utilizamos la señal para obtener el estado del usuario
      const user = this.authService.user();
      if (user) {
        // Si el usuario está autenticado, redirige a home para evitar el acceso a rutas de autenticación
        this.router.navigate(['/home']);
        observer.next(false);  // No permitir acceso a rutas protegidas
      } else {
        // Si no está autenticado, permite el acceso
        observer.next(true);
      }
      observer.complete();
    });
  }
}
