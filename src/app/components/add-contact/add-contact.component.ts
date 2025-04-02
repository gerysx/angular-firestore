import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [MatIcon, MatTooltip],
  template: `
   <button (click)="onNewClick()" 
        class="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-md transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-green-700 hover:bg-lightblue"
        matTooltip="Nuevo">
  <mat-icon class="text-sm">add_box</mat-icon> <!-- Ajustar el tamaño del icono -->
</button>

  `,
  styles: ` /* Agregar la fuente Poppins a todo el toolbar */
  .font-poppins {
     font-family: 'Poppins', sans-serif;
   }
 
   /* Asegurar que los iconos tengan el mismo tamaño y estén centrados */
   .mat-icon {
     width: 20px;
     height: 20px;
     display: flex;
     align-items: center;
     justify-content: center;
   }
 
   /* Estilo para los botones, texto más pequeño */
   .mat-button, .mat-icon {
     font-size: 0.875rem; /* Tamaño de texto más pequeño */
   }
 
   /* Personalización para los enlaces del dropdown */
   mat-button {
     border-radius: 0.375rem; /* Bordes suaves */
   }
 
   /* Asegurar que los botones tengan un tamaño adecuado y el texto se vea alineado */
   a.mat-button {
     display: flex;
     align-items: center;
     justify-content: center;
     height: 40px; /* Asegurando que todos los botones tengan la misma altura */
   }`,
})
export class AddContactComponent {
  @Output() onNewContactEvent = new EventEmitter<void>();

  onNewClick(): void {
    this.onNewContactEvent.emit(); // Emite el evento para que el componente padre maneje la acción
  }
}
