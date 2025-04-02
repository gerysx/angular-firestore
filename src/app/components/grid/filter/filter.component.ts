import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AddContactComponent } from '@components/add-contact/add-contact.component';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalService } from '@components/modal/modal.service';
import { MatIcon } from '@angular/material/icon';

/**
 * Módulos de Angular Material necesarios
 */
const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, FormsModule, MatIcon];

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MATERIAL_MODULES, AddContactComponent],
  templateUrl: './filter.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private readonly _modalSvc = inject(ModalService);

  @Input() filter: string = '';  
  @Input() label: string = 'Filtro';
  @Input() placeholder: string = 'Ej. nombre';
  @Output() filterChange = new EventEmitter<string>();

  // Emite el valor del filtro cuando cambia
  onFilterChange() {
    this.filterChange.emit(this.filter);
  }

  // Abre el modal para agregar un nuevo contacto
  onClickNewContact() {
    this._modalSvc.openModal<ModalComponent>(ModalComponent);
  }
}
