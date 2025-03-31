import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ModalService } from '@components/modal/modal.service';
import { ContactService } from '@features/contacts/contact.service';
import { APP_CONSTANTS } from '@shared/constants';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { Contact } from '@features/contacts/contact.interface';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule, MatButtonModule];

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  contactForm!: FormGroup;
  isEditing: boolean = false;

  private readonly _fb = inject(FormBuilder);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBar = inject(SnackBarService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { contact?: Contact, isEditing: boolean }) {}

  ngOnInit(): void {
    this.isEditing = this.data?.isEditing || false;
    this._buildForm();
    if (this.data?.contact) {
      this.contactForm.patchValue(this.data.contact);
    }
  }

  async onSubmit() {
    const contact = this.contactForm.value;
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;

    try {
      if (this.isEditing && this.data.contact?.id) {
        await this._contactSvc.updateContact(this.data.contact.id, contact);
      } else {
        await this._contactSvc.newContact(contact);
        message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
      }

      this._snackBar.showSnackBar(message);
      this._modalSvc.closeModal();
    } catch (error) {
      console.error("Error al guardar contacto:", error);
      this._snackBar.showSnackBar("Error al guardar el contacto");
    }
  }

  getTitle(): string {
    return this.isEditing ? 'Editar Contacto' : 'Nuevo Contacto';
  }

  private _buildForm(): void {
    this.contactForm = this._fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
