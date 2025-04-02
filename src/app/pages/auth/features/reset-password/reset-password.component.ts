import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importar MatSnackBar

/**
 * Componente para restablecer la contraseña del usuario.
 * Permite al usuario ingresar su correo electrónico y, si está registrado
 * mediante el método tradicional (correo y contraseña), envía un correo de restablecimiento.
 */
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styles: [],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar  // Usar MatSnackBar en lugar de Toastr
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get emailControl() {
    return this.resetPasswordForm.get('email');
  }

  /**
   * Maneja el envío del formulario de restablecimiento de contraseña.
   */
  async onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.openSnackBar('Por favor, ingresa un correo válido.', 'Cerrar');
      return;
    }

    const email = this.resetPasswordForm.value.email.trim();

    try {
      await this.authService.resetPassword(email);
      this.openSnackBar('Correo de restablecimiento enviado con éxito.', 'Cerrar');

      // Redireccionar después de mostrar el mensaje de éxito
      setTimeout(() => {
        this.router.navigate(['/sign-in']);
      }, 2000);
    } catch (error: any) {
      this.openSnackBar(error.message || 'Error al enviar el correo de restablecimiento.', 'Cerrar');
    }
  }

/**
 * Muestra un Snackbar con el mensaje proporcionado.
 * @param message El mensaje que se desea mostrar en el Snackbar.
 * @param action La acción que el usuario puede tomar (por ejemplo, 'Cerrar').
 * @param isError Define si el mensaje es de error (true) o éxito (false).
 */
openSnackBar(message: string, action: string, isError: boolean = false) {
  this.snackBar.open(message, action, {
    duration: 3000,  // Duración en milisegundos
    verticalPosition: 'bottom',  // Posición vertical
    horizontalPosition: 'center',  // Posición horizontal
    panelClass: isError
      ? ['bg-red-600', 'text-white', 'font-bold']  // Si es un error, color rojo
      : ['bg-green-600', 'text-white', 'font-bold'],  // Si es un éxito, color verde
  });
}
}
