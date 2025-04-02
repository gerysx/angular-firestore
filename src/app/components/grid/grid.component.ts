import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from "./filter/filter.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONSTANTS } from '@shared/constants';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { Contact } from '@features/contacts/contact.interface';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Módulos de Angular Material necesarios para la tabla y los filtros.
 */
const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginatorModule, FilterComponent, MatButtonModule, MatIconModule];

/**
 * Componente de tabla que muestra una lista de contactos, con funcionalidades de filtrado, ordenación y paginación.
 * Permite la edición y eliminación de contactos mediante un modal.
 */
@Component({
  selector: 'app-grid', // Selector utilizado en las plantillas HTML para este componente
  standalone: true, // Este componente es autónomo y no necesita ser parte de un módulo
  imports: [MATERIAL_MODULES, CommonModule], // Módulos necesarios para la funcionalidad
  templateUrl: './grid.component.html', // Plantilla del componente
  styleUrls: ['./grid.component.css'] // Estilos asociados al componente
})
export class GridComponent implements OnInit {
  
  /** 
   * Columnas a mostrar en la tabla.
   * @example ['nombre', 'telefono', 'email']
   */
  @Input() displayedColumns!: string[];

  /** 
   * Datos de los contactos a mostrar en la tabla.
   * Se espera que sea un arreglo de objetos de tipo Contact.
   */
  @Input() data!: Contact[];

  /** 
   * Columnas que se pueden ordenar.
   * Se utiliza para habilitar la ordenación en ciertas columnas de la tabla.
   */
  @Input() sortableColumns: string[] = [];

  /** 
   * Fuente de datos para la tabla, que se utiliza para mostrar los contactos.
   */
  dataSource = new MatTableDataSource<Contact>();

  /** 
   * Valor de filtro para la búsqueda, se utiliza como 'signal' para facilitar la reactividad.
   */
  valueToFilter = signal('');

  /** 
   * Referencia a la directiva MatSort que maneja la ordenación de la tabla.
   */
  @ViewChild(MatSort) private _sort!: MatSort;

  /** 
   * Referencia a la directiva MatPaginator que maneja la paginación de la tabla.
   */
  @ViewChild(MatPaginator) private _paginator!: MatPaginator;

  /** 
   * Servicio que maneja las operaciones relacionadas con los contactos.
   */
  private readonly _contactSvc = inject(ContactService);

  /** 
   * Servicio que maneja la apertura y cierre de modales.
   */
  private readonly _modalSvc = inject(ModalService);

  /** 
   * Servicio que muestra notificaciones mediante snackbars.
   */
  private readonly _snackBar = inject(SnackBarService);

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Carga los contactos mediante el servicio correspondiente.
   */
  ngOnInit(): void {
    this._loadContacts();
  }

  /**
   * Carga los contactos utilizando el servicio ContactService.
   * Asigna los contactos a la fuente de datos de la tabla y configura la paginación y ordenación.
   */
  private _loadContacts(): void {
    this._contactSvc.getAllContacts().subscribe(contacts => {
      this.dataSource.data = contacts;
      this.dataSource.sort = this._sort;
      this.dataSource.paginator = this._paginator;
    });
  }

  /**
   * Abre el formulario de edición en un modal para modificar un contacto.
   * @param contact El contacto que se va a editar.
   */
  openEditForm(contact: Contact): void {
    this._modalSvc.openModal<ModalComponent, Contact>(ModalComponent, contact, true);
  }

  /**
   * Selecciona una fila en la tabla y abre el formulario de edición para ese contacto.
   * @param contact El contacto seleccionado.
   */
  selectedRow(contact: Contact): void {
    this.openEditForm(contact);
  }

  /**
   * Elimina un contacto después de mostrar una confirmación al usuario.
   * Si el usuario confirma, el contacto se elimina mediante el servicio correspondiente.
   * @param id El ID del contacto que se va a eliminar.
   */
  async deleteContact(id: string): Promise<void> {
    const confirmation = confirm(APP_CONSTANTS.MESSAGES.CONFIRMATION_PROMPT);
    if (confirmation) {
      try {
        await this._contactSvc.deleteContact(id);
        this._snackBar.showSnackBar(APP_CONSTANTS.MESSAGES.CONTACT_DELETED);
        this._loadContacts(); // Recarga la lista tras la eliminación
      } catch (error) {
        console.error("Error al eliminar contacto:", error);
        this._snackBar.showSnackBar("Error al eliminar el contacto");
      }
    }
  }

  /**
   * Aplica el filtro a la tabla de contactos, basándose en el valor ingresado en el campo de filtro.
   * @param event El evento del input que contiene el valor del filtro.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
