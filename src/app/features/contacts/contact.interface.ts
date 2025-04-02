import { Timestamp } from "@angular/fire/firestore";

/**
 * Tipo que representa las claves de las propiedades de un objeto de tipo `T`.
 * 
 * @template T El tipo del objeto cuyas claves queremos obtener.
 */
export type ColumnKeys<T> = Array<keyof T>;

/**
 * Interfaz que define la estructura de un contacto.
 * 
 * Representa los datos de un contacto en la aplicación.
 */
export interface Contact {
  /** Identificador único del contacto */
  id: string;

  /** Nombre del contacto */
  nombre: string;

  /** Número de teléfono del contacto */
  telefono: number;

  /** Correo electrónico del contacto */
  email: string;

  /** Acción asociada al contacto (e.g., editar, eliminar) */
  action: string;

  /** Fecha de creación del contacto */
  created: Timestamp;

  /** Fecha de última actualización del contacto */
  updated: Timestamp;
}
