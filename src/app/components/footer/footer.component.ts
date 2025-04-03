import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

/**
 * Componente de pie de página.
 * Este componente representa el pie de página de la aplicación, 
 * que puede contener información adicional o enlaces.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIcon, MatIconModule, MatToolbar], // Importa los módulos necesarios para iconos de Material
  templateUrl: './footer.component.html', // Enlace al archivo HTML de la plantilla
  styleUrl: './footer.component.css', // Enlace al archivo de estilos CSS
})
export class FooterComponent {
  // No contiene lógica en este caso, solo se encarga de mostrar el pie de página
}
