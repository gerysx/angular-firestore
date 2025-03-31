import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Contact {
    id: string;
    nombre: string;
    telefono: number;
    email: string;   
    action: string;
    created: Timestamp;
    updated: Timestamp;
}