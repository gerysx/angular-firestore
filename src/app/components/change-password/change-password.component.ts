import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styles: ``,
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _snackBar: SnackBarService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.passwordForm = this._fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Mínimo 8 caracteres
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ), // Debe contener una mayúscula, un número y un carácter especial
        ],
      ],
      confirmNewPassword: ['', [Validators.required]],
    });
  }

  async onChangePassword() {
    if (this.passwordForm.invalid) {
      this._snackBar.showSnackBar(
        'Por favor, completa todos los campos correctamente.',
        'Cerrar'
      );
      return;
    }

    const { newPassword, confirmNewPassword } = this.passwordForm.value;

    if (newPassword !== confirmNewPassword) {
      this._snackBar.showSnackBar('Las contraseñas no coinciden.', 'Cerrar');
      return;
    }

    try {
      await this._auth.changePassword(newPassword);
      this._snackBar.showSnackBar(
        'Contraseña actualizada con éxito.',
        'Cerrar'
      );
      this.passwordForm.reset();
      this._router.navigate(['/contacts']); // Redirigir al perfil tras éxito
    } catch (error) {
      this._snackBar.showSnackBar(
        'Error al cambiar la contraseña: ' + error,
        'Cerrar'
      );
    }
  }
}
