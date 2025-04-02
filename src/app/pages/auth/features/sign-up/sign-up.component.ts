import { Component, inject } from '@angular/core';
import { validatePassword } from '@angular/fire/auth';  // Importamos la función para validar contraseñas (aunque no se usa directamente)
import {
  EmailValidator,  // Para validar email (aunque no se usa directamente aquí)
  FormBuilder, 
  FormControl, 
  ReactiveFormsModule, 
  Validators,  // Utilizados para la validación de formularios
} from '@angular/forms';  // Módulos de Angular para formularios reactivos
import { hasEmailError, isRequired } from '../../utils/validators';  // Funciones de validación personalizadas
import { AuthService } from '../../data-access/auth.service';  // Servicio para la autenticación
import { toast } from 'ngx-sonner';  // Paquete para mostrar notificaciones emergentes (toast)
import { Router, RouterLink } from '@angular/router';  // Módulos para la navegación
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';  // Componente para el inicio de sesión con Google

/**
 * Interfaz que define la estructura del formulario de registro.
 */
interface FormSignUp {
  /** Campo de email, que puede ser una cadena o null. */
  email: FormControl<string | null>;  
  /** Campo de contraseña, que puede ser una cadena o null. */
  password: FormControl<string | null>;  
}

/**
 * Componente que maneja el formulario de registro de usuario.
 * 
 * Este componente permite a los usuarios registrarse usando su correo electrónico y contraseña,
 * o mediante su cuenta de Google.
 */
@Component({
  selector: 'app-sign-up',  // Selector del componente en el HTML
  standalone: true,  // Este componente es independiente y no tiene dependencias externas
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],  // Componentes y módulos que utiliza el componente
  templateUrl: './sign-up.component.html',  // Ruta a la plantilla HTML para este componente
  styles: ``,  // Estilos en línea (vacíos por ahora)
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);  // Inyectamos el FormBuilder para crear formularios reactivos
  private _authService = inject(AuthService);  // Inyectamos el servicio de autenticación
  private _router = inject(Router);  // Inyectamos el servicio de enrutamiento para redirigir al usuario

  /**
   * Método para validar si un campo de formulario es obligatorio.
   * @param field - El nombre del campo que queremos validar (email o password).
   * @returns `true` si el campo está vacío, `false` en caso contrario.
   */
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);  // Llamamos a la función isRequired para la validación
  }

  /**
   * Método para verificar si el campo de email tiene errores de validación.
   * @returns `true` si el email es inválido, `false` en caso contrario.
   */
  hasEmailError() {
    return hasEmailError(this.form);  // Llamamos a la función hasEmailError para la validación
  }

  /**
   * Creamos el formulario reactivo para la captura de datos del usuario.
   * El formulario contiene campos de email y password con sus validaciones.
   */
  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [  // Control para el email con validaciones
      Validators.required,  // El email es obligatorio
      Validators.email,  // El email debe tener un formato válido
    ]),
    password: this._formBuilder.control('', Validators.required),  // La contraseña es obligatoria
  });

  /**
   * Método que maneja el envío del formulario de registro.
   * 
   * Este método valida el formulario, recoge los valores de los campos y llama al servicio
   * de autenticación para crear una nueva cuenta de usuario.
   */
  async submit() {
    if (this.form.invalid) return;  // Si el formulario es inválido, no hacemos nada

    try {
      const { email, password } = this.form.getRawValue();  // Obtenemos los valores del formulario

      if (!email || !password) return;  // Si no hay email o contraseña, no hacemos nada

      // Llamamos al servicio para crear la cuenta de usuario
      await this._authService.signUp({ email, password });

      toast.success('Hola nuevamente');  // Mostramos un mensaje de éxito
      this._router.navigateByUrl('/contacts');  // Redirigimos al usuario a la página de contactos
    } catch (error) {
      toast.error('Ocurrió un error');  // Si ocurre un error, mostramos un mensaje de error
    }
  }

  /**
   * Método que maneja el registro de usuario utilizando Google como proveedor de autenticación.
   * 
   * Este método usa el servicio de autenticación para registrar al usuario mediante su cuenta de Google.
   */
  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();  // Llamamos al servicio para iniciar sesión con Google
      toast.success('Bienvenido de nuevo');  // Mostramos un mensaje de éxito
      this._router.navigateByUrl('/contacts');  // Redirigimos al usuario a la página de contactos
    } catch (error) {
      toast.error('Ocurrió un error');  // Si ocurre un error, mostramos un mensaje de error
    }
  }
}
