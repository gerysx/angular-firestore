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

/**
 * Componente para cambiar la contraseña del usuario.
 * Permite actualizar la contraseña actual por una nueva.
 */
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styles: ``,
})
export class ChangePasswordComponent implements OnInit {
  /**
   * Formulario reactivo que gestiona el cambio de contraseña.
   */
  passwordForm!: FormGroup;

  /**
   * Constructor del componente ChangePasswordComponent.
   * 
   * @param _fb - Servicio para la creación de formularios reactivos.
   * @param _auth - Servicio para la autenticación de usuario.
   * @param _snackBar - Servicio para mostrar mensajes emergentes.
   * @param _router - Servicio de enrutamiento para redirigir al usuario tras el cambio.
   */
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _snackBar: SnackBarService,
    private _router: Router
  ) {}

  /**
   * Inicializa el formulario de cambio de contraseña con sus validaciones.
   */
  ngOnInit(): void {
    this.passwordForm = this._fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
        ],
      ],
      confirmNewPassword: ['', [Validators.required]],
    });
  }

  /**
   * Método para cambiar la contraseña. 
   * Valida los campos y las contraseñas antes de realizar el cambio.
   * 
   * @async
   */
  async onChangePassword(): Promise<void> {
    // Si el formulario es inválido, muestra un mensaje de error
    if (this.passwordForm.invalid) {
      this._snackBar.showSnackBar(
        'Por favor, completa todos los campos correctamente.',
        'Cerrar'
      );
      return;
    }

    const { newPassword, confirmNewPassword } = this.passwordForm.value;

    // Si las contraseñas no coinciden, muestra un mensaje de error
    if (newPassword !== confirmNewPassword) {
      this._snackBar.showSnackBar('Las contraseñas no coinciden.', 'Cerrar');
      return;
    }

    try {
      // Cambia la contraseña si es válida
      await this._auth.changePassword(newPassword);
      this._snackBar.showSnackBar(
        'Contraseña actualizada con éxito.',
        'Cerrar'
      );
      this.passwordForm.reset();
      this._router.navigate(['/contacts']); // Redirige tras éxito
    } catch (error) {
      // Si ocurre un error, muestra un mensaje
      this._snackBar.showSnackBar(
        'Error al cambiar la contraseña: ' + error,
        'Cerrar'
      );
    }
  }
}
