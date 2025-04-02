import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Servicio para mostrar notificaciones tipo SnackBar en la aplicación.
 * Utiliza el componente MatSnackBar de Angular Material para mostrar mensajes breves y temporales.
 */
@Injectable({ providedIn: 'root' })
export class SnackBarService {
  private readonly _snackBar = inject(MatSnackBar);  // Inyectamos MatSnackBar para mostrar las notificaciones.

  /**
   * Muestra una notificación tipo SnackBar con el mensaje proporcionado.
   * 
   * @param message El mensaje que se mostrará en el SnackBar.
   * @param action El texto del botón de acción que aparece en el SnackBar (por defecto es 'ok').
   * 
   * @returns void
   */
  showSnackBar(message: string, action = 'ok'): void {
    this._snackBar.open(message, action, {
      duration: 3000,  // Duración en milisegundos de la notificación.
      verticalPosition: 'top',  // Posiciona la notificación en la parte superior de la pantalla.
      horizontalPosition: 'right'  // Posiciona la notificación en la parte derecha de la pantalla.
    });
  }
}
