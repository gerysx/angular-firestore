import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from './filter/filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONSTANTS } from '@shared/constants';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { Contact } from '@features/contacts/contact.interface';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from '@components/add-contact/add-contact.component';

/**
 * Lista de módulos de Angular Material necesarios para la tabla y los filtros.
 */
const MATERIAL_MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  FilterComponent,
  MatButtonModule,
  MatIconModule
];

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES, CommonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() displayedColumns!: string[];
  @Input() data!: Contact[];
  @Input() sortableColumns: string[] = [];

  // MatTableDataSource ahora se configura correctamente
  dataSource = new MatTableDataSource<Contact>();

  // Filtro que se enlaza con el componente de filtro
  filter: string = '';

  @ViewChild(MatSort) private _sort!: MatSort;
  @ViewChild(MatPaginator) private _paginator!: MatPaginator;

  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBar = inject(SnackBarService);

  ngOnInit(): void {
    this._loadContacts();
  }

  private _loadContacts(): void {
    this._contactSvc.getAllContacts().subscribe(contacts => {
      this.dataSource.data = contacts;
      this.dataSource.sort = this._sort;
      this.dataSource.paginator = this._paginator;
    });
  }

  openEditForm(contact: Contact): void {
    this._modalSvc.openModal<ModalComponent, Contact>(ModalComponent, contact, true);
  }

  selectedRow(contact: Contact): void {
    this.openEditForm(contact);
  }

  async deleteContact(id: string): Promise<void> {
    const confirmation = confirm(APP_CONSTANTS.MESSAGES.CONFIRMATION_PROMPT);
    if (confirmation) {
      try {
        await this._contactSvc.deleteContact(id);
        this._snackBar.showSnackBar(APP_CONSTANTS.MESSAGES.CONTACT_DELETED);
        this._loadContacts();
      } catch (error) {
        console.error('Error al eliminar contacto:', error);
        this._snackBar.showSnackBar('Error al eliminar el contacto');
      }
    }
  }

  // Aplicar filtro correctamente
  applyFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

}
