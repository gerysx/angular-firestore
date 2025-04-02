import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { ColumnKeys, Contact } from '../contact.interface';
import { ContactService } from '../contact.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

/**
 * Componente que lista todos los contactos en una tabla con opciones de filtrado y ordenación.
 * 
 * Este componente obtiene los datos de los contactos mediante el servicio `ContactService` y los muestra en un componente de tabla (`GridComponent`).
 */
@Component({
  selector: 'app-list', // Selector para usar este componente en otras plantillas
  standalone: true, // Componente autónomo que no depende de un módulo
  imports: [GridComponent], // Importa el componente de la tabla para mostrar los contactos
  template: `
  <section>
      <!-- Componente de tabla que recibe columnas, datos y columnas ordenables como parámetros -->
      <app-grid [displayedColumns]="displayedColumns" [data]="contacts()" [sortableColumns]="sortables"/>
  </section>
  `,
})
export class ListComponent implements OnInit {
  /**
   * Signal que contiene la lista de contactos.
   * Se utiliza para almacenar los contactos obtenidos y actualizar la vista de manera reactiva.
   */
  contacts = signal<Contact[]>([]);

  /**
   * Lista de columnas a mostrar en la tabla.
   * Las columnas incluyen el identificador, nombre, teléfono, correo electrónico y una columna de acción.
   */
  displayedColumns: ColumnKeys<Contact> = ['id', 'nombre', 'telefono', 'email', 'action', ];

  /**
   * Columnas que son ordenables en la tabla.
   * Se pueden especificar aquí las columnas que el usuario podrá ordenar.
   */
  sortables: ColumnKeys<Contact> = ['id', 'nombre', 'telefono', 'email'];

  /**
   * Servicio para obtener y manipular los datos de los contactos.
   */
  private readonly _contactSvc = inject(ContactService);

  /**
   * Referencia para manejar el ciclo de vida de destrucción del componente.
   */
  private readonly _destroyRef = inject(DestroyRef);

  /**
   * Método llamado al inicializar el componente.
   * 
   * Obtiene todos los contactos llamando a la función `getAllContacts` para cargarlos desde el servicio.
   */
  ngOnInit(): void {
    this.getAllContacts();
  }

  /**
   * Obtiene todos los contactos del servicio `ContactService` y los asigna a la `signal` de contactos.
   * 
   * El método también maneja la cancelación de la suscripción cuando el componente es destruido utilizando `takeUntilDestroyed`.
   */
  getAllContacts() {
    this._contactSvc.getAllContacts()
      .pipe(
        // Utiliza 'takeUntilDestroyed' para cancelar la suscripción cuando el componente se destruye
        takeUntilDestroyed(this._destroyRef),
        // Al recibir los contactos, se asignan a la propiedad 'contacts' reactiva
        tap((contacts: Contact[]) => this.contacts.set(contacts))
      )
      .subscribe();
  }
}
