import { Timestamp } from "firebase/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Profile {
    nombre: string;
    apellido: string;
    cod_postal: number;
    ciudad: string;
    movil: number;
    email: string;   
    pais: string;
    created: Timestamp;
    updated: Timestamp;

    
}