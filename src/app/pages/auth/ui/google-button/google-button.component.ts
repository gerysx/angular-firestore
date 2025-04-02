import { Component, output } from '@angular/core';

/**
 * Componente para el botón de inicio de sesión con Google.
 * 
 * Este componente maneja el clic en el botón de Google y emite un evento cuando se hace clic en él.
 */
@Component({
  selector: 'app-google-button',  // El selector del componente que se utilizará en la plantilla HTML
  imports: [],  // No se importan módulos adicionales en este componente
  templateUrl: './google-button.component.html',  // Ruta al archivo de la plantilla HTML para el componente
})
export class GoogleButtonComponent {
  
  /**
   * Evento que se emite cuando el botón de Google es clickeado.
   * 
   * Este evento no lleva datos y simplemente indica que el usuario ha hecho clic en el botón.
   */
  onclick = output<void>();  // Declaración del evento de salida que el componente emitirá
}
