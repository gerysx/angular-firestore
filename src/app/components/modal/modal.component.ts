import { Component, OnInit, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '@components/modal/modal.service';
import { ContactService } from '@features/contacts/contact.service';
import { APP_CONSTANTS } from '@shared/constants';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { CommonModule } from '@angular/common';
import { Contact } from '@features/contacts/contact.interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  /** 
   * Formulario reactivo para el contacto
   * @type {FormGroup}
   */
  contactForm!: FormGroup;

  /** 
   * Indica si es edición o nuevo contacto
   * @type {boolean}
   */
  isEditing: boolean = false;

  private readonly _fb = inject(FormBuilder);  // FormBuilder
  private readonly _contactSvc = inject(ContactService);  // ContactService
  private readonly _modalSvc = inject(ModalService);  // ModalService
  private readonly _snackBar = inject(SnackBarService);  // SnackBarService

  /**
   * Constructor
   * @param data - Datos del modal (contacto y si es edición)
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { contact?: Contact, isEditing: boolean }) {}

  /**
   * Inicializa el componente y construye el formulario.
   * @returns {void}
   */
  ngOnInit(): void {
    this.isEditing = this.data?.isEditing || false;
    this._buildForm();
    if (this.data?.contact) {
      this.contactForm.patchValue(this.data.contact);
    }
  }

  /**
   * Maneja el envío del formulario.
   * @returns {void}
   */
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const contact = this.contactForm.value;
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;

    try {
      if (this.isEditing && this.data.contact?.id) {
        this._contactSvc.updateContact(this.data.contact.id, contact);
      } else {
        this._contactSvc.newContact(contact);
        message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
      }

      this._snackBar.showSnackBar(message);
      this._modalSvc.closeModal();
    } catch (error) {
      console.error("Error al guardar contacto:", error);
      this._snackBar.showSnackBar("Error al guardar el contacto");
    }
  }

  /**
   * Devuelve el título del modal basado en si es edición o creación.
   * @returns {string} - "Editar Contacto" o "Nuevo Contacto"
   */
  getTitle(): string {
    return this.isEditing ? 'Editar Contacto' : 'Nuevo Contacto';
  }

  /**
   * Construye el formulario reactivo
   * @private
   * @returns {void}
   */
  private _buildForm(): void {
    this.contactForm = this._fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Verifica si un campo es inválido y tocado.
   * @param {string} field - El nombre del campo a verificar
   * @returns {boolean} - `true` si es inválido y tocado
   */
  isInvalid(field: string): boolean {
    return this.contactForm.controls[field].invalid && this.contactForm.controls[field].touched;
  }
}
