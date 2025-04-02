import { FormGroup } from "@angular/forms";

/**
 * Función para verificar si un campo es obligatorio y si ha sido tocado sin tener un valor.
 * 
 * @param field El nombre del campo que se va a verificar ('email' o 'password').
 * @param form El formulario reactivo que contiene los campos.
 * @returns `true` si el campo es obligatorio y tiene un error de 'required', `false` en caso contrario.
 */
export const isRequired = (field: 'email' | 'password', form: FormGroup) => {
    // Obtener el control del formulario basado en el nombre del campo
    const control = form.get(field);

    // Verificar si el control existe, si ha sido tocado y si tiene el error 'required'
    return control && control.touched && control.hasError('required');
}

/**
 * Función para verificar si el campo de email tiene un error de formato de email.
 * 
 * @param form El formulario reactivo que contiene el campo de email.
 * @returns `true` si el campo de email tiene un error de tipo 'email', `false` en caso contrario.
 */
export const hasEmailError = (form: FormGroup) => {
    // Obtener el control de email del formulario
    const control = form.get('email');
    
    // Verificar si el control existe, si ha sido tocado y si tiene el error 'email'
    return control && control?.touched && control.hasError('email');
}
