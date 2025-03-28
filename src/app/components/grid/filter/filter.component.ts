import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, FormsModule];

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MATERIAL_MODULES],
  template: `
    <mat-form-field>
    <mat-label>{{label()}}</mat-label>
    <input matInput type="text" [(ngModel)]="filter" [placeholder]="placeholder()">
  </mat-form-field>
  `,
  styles: `
  /* Establecer el ancho completo para el filtro */
section.mt-1 {
  margin-top: 1rem;
}

mat-form-field {
  width: 100%; /* Esto asegura que el filtro ocupe todo el ancho disponible */
}

.mat-elevation-z8 {
  padding: 1rem; /* Añadimos un poco de espaciado para mejorar la presentación */
}

/* Ajustar el filtro al 100% de ancho */
.app-filter {
  width: 100%;
}

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {

  filter = model('');
  label = input<string>('Filtro');
  placeholder = input<string>('Ej. nombre');
}
