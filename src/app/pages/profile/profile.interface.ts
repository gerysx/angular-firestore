import { Timestamp } from "firebase/firestore";

/**
 * Tipo genérico para obtener las claves de las propiedades de un objeto.
 * 
 * @template T Tipo del objeto que contiene las claves.
 */
export type ColumnKeys<T> = Array<keyof T>;

/**
 * Interfaz que representa el perfil de un usuario.
 * Define la estructura de los datos del perfil con la que interactuará la aplicación.
 */
export interface Profile {
    /**
     * Nombre del usuario.
     * Es un campo obligatorio que contiene el primer nombre del usuario.
     */
    nombre: string;

    /**
     * Apellido del usuario.
     * Es un campo obligatorio que contiene el apellido del usuario.
     */
    apellido: string;

    /**
     * Código postal del usuario.
     * Debe ser un número que represente la zona postal del usuario.
     */
    cod_postal: number;

    /**
     * Ciudad donde reside el usuario.
     * Es un campo obligatorio que define la ciudad de residencia.
     */
    ciudad: string;

    /**
     * Número de teléfono móvil del usuario.
     * Es un campo obligatorio y debe contener solo números.
     */
    movil: number;

    /**
     * Dirección de correo electrónico del usuario.
     * Es un campo obligatorio y debe tener un formato de correo electrónico válido.
     */
    email: string;

    /**
     * País donde reside el usuario.
     * Es un campo obligatorio que representa el país del usuario.
     */
    pais: string;

    /**
     * Marca temporal de la creación del perfil.
     * Se asigna cuando se crea un perfil nuevo.
     */
    created: Timestamp;

    /**
     * Marca temporal de la última actualización del perfil.
     * Se actualiza cada vez que el perfil es modificado.
     */
    updated: Timestamp;
}
