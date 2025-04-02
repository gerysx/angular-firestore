import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';  // Utiliza el paquete 'ngx-sonner' para mostrar notificaciones de toast
import { AuthService } from '../../data-access/auth.service';  // Servicio de autenticación
import { isRequired, hasEmailError } from '../../utils/validators';  // Funciones de validación personalizadas
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';  // Componente de Google Button

// Interface para el formulario de inicio de sesión
export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',  // Selector del componente
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],  // Módulos y componentes importados
  templateUrl: './sign-in.component.html',  // Plantilla HTML del componente
  
})
export default class SignInComponent {
  // Inyección de dependencias
  private _formBuilder = inject(FormBuilder);  // FormBuilder para la creación de formularios reactivos
  private _authService = inject(AuthService);  // Servicio de autenticación
  private _router = inject(Router);  // Servicio de enrutamiento de Angular

  /**
   * Método que verifica si el campo de formulario es obligatorio.
   * @param field El campo a validar ('email' o 'password')
   * @returns Verdadero si el campo está vacío o es inválido.
   */
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  /**
   * Verifica si hay un error de formato en el correo electrónico.
   * @returns Verdadero si el campo de email contiene un error.
   */
  hasEmailError() {
    return hasEmailError(this.form);
  }

  // Definición del formulario reactivo para el inicio de sesión
  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,  // El email es obligatorio
      Validators.email,  // El formato del email debe ser válido
    ]),
    password: this._formBuilder.control('', Validators.required),  // La contraseña es obligatoria
  });

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Si el formulario es válido, intenta autenticar al usuario.
   */
  async submit() {
    if (this.form.invalid) return;  // Si el formulario es inválido, no hacer nada

    try {
      const { email, password } = this.form.getRawValue();  // Extrae los valores del formulario

      if (!email || !password) return;  // Si no hay email o contraseña, no hacer nada

      // Llamada al servicio de autenticación para iniciar sesión
      await this._authService.signIn({ email, password });

      toast.success('Usuario creado correctamente');  // Muestra un mensaje de éxito
      this._router.navigateByUrl('/contacts');  // Navega a la página de contactos después del inicio de sesión
    } catch (error) {
      toast.error('Ocurrió un error');  // Muestra un mensaje de error
    }
  }

  /**
   * Maneja el inicio de sesión con Google.
   * Realiza la autenticación usando el proveedor de Google.
   */
  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();  // Llama al servicio para iniciar sesión con Google
      toast.success('Bienvenido de nuevo');  // Muestra un mensaje de éxito
      this._router.navigateByUrl('/contacts');  // Navega a la página de contactos después del inicio de sesión
    } catch (error) {
      toast.error('Ocurrió un error');  // Muestra un mensaje de error
    }
  }
}
