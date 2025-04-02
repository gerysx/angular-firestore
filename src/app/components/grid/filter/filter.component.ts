import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

/**
 * Lista de módulos de Angular Material necesarios para el componente.
 * Incluye MatInput, MatFormField y MatLabel.
 */
const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, FormsModule];

/**
 * Componente de filtro que permite a los usuarios introducir texto para filtrar resultados.
 * Este componente es reutilizable y se adapta a diferentes contextos de filtro.
 */
@Component({
  selector: 'app-filter', // Nombre del componente utilizado en las plantillas HTML
  standalone: true, // Este componente es autónomo y no necesita ser parte de un módulo
  imports: [MATERIAL_MODULES], // Módulos de Angular Material necesarios para la interfaz
  template: `
    <mat-form-field>
      <mat-label>{{label()}}</mat-label> <!-- Etiqueta dinámica que muestra el texto del filtro -->
      <input matInput type="text" [(ngModel)]="filter" [placeholder]="placeholder()"> <!-- Campo de texto para ingresar el filtro -->
    </mat-form-field>
  `,
  styles: `
    section.mt-1 {
      margin-top: 1rem; /* Espaciado superior */
    }

    mat-form-field {
      width: 100%; /* Asegura que el campo de texto ocupe todo el ancho disponible */
    }

    .mat-elevation-z8 {
      padding: 1rem; /* Añade espacio de relleno */
    }

    .app-filter {
      width: 100%; /* Garantiza que el filtro ocupe todo el espacio disponible */
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, // Estrategia de detección de cambios para optimizar el rendimiento
})
export class FilterComponent {
  
  /** 
   * Valor del filtro ingresado por el usuario.
   * Se enlaza bidireccionalmente con el campo de texto en la plantilla.
   */
  filter = model('');

  /** 
   * Etiqueta del filtro. Devuelve el texto para mostrar como la etiqueta.
   * Por defecto, se establece como 'Filtro'.
   */
  label = input<string>('Filtro');

  /** 
   * Texto del placeholder para el campo de entrada. 
   * Por defecto, se establece como 'Ej. nombre'.
   */
  placeholder = input<string>('Ej. nombre');
}
