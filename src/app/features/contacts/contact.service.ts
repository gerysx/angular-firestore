import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc, query, orderBy } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Contact } from "./contact.interface";
import { Auth } from "@angular/fire/auth";

/**
 * Servicio que gestiona la interacción con los contactos del usuario en Firebase.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
    private readonly _firestore = inject(Firestore);
    private readonly _auth = inject(Auth);

    /**
     * Obtiene la colección de contactos del usuario autenticado.
     * 
     * @throws {Error} Si el usuario no está autenticado.
     * @returns Colección de contactos en Firestore.
     */
    private _getUserContactsCollection() {
        const user = this._auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        return collection(this._firestore, `users/${user.uid}/contacts`);
    }

    /**
     * Crea un nuevo contacto en la base de datos de Firestore.
     * 
     * @param {Partial<Contact>} contact Datos del contacto a crear.
     * @returns Promesa que se resuelve cuando el contacto es creado.
     */
    async newContact(contact: Partial<Contact>) {
        const contactCollection = this._getUserContactsCollection();
        return await addDoc(contactCollection, {
            created: Date.now(),
            updated: Date.now(),
            ...contact,
        });
    }

    /**
     * Obtiene todos los contactos del usuario autenticado.
     * 
     * @returns Observable que emite una lista de contactos.
     */
    getAllContacts(): Observable<Contact[]> {
        const contactCollection = this._getUserContactsCollection();
        const queryFn = query(contactCollection, orderBy("created", "desc"));
        return collectionData(queryFn, { idField: "id" }) as Observable<Contact[]>;
    }

    /**
     * Obtiene un contacto específico por su ID.
     * 
     * @param {string} id El ID del contacto a obtener.
     * @returns Promesa que resuelve con el contacto encontrado.
     */
    async getContactById(id: string): Promise<Contact> {
        const docRef = this._getDocRef(id);
        const documentData = await getDoc(docRef);
        return documentData.data() as Contact;
    }

    /**
     * Actualiza un contacto existente en la base de datos.
     * 
     * @param {string} id El ID del contacto a actualizar.
     * @param {Contact} contact Los nuevos datos del contacto.
     * @returns Promesa que se resuelve cuando el contacto es actualizado.
     */
    async updateContact(id: string, contact: Contact): Promise<void> {
        const docRef = this._getDocRef(id);
        await updateDoc(docRef, { ...contact, updated: Date.now() });
    }

    /**
     * Elimina un contacto específico de la base de datos.
     * 
     * @param {string} id El ID del contacto a eliminar.
     * @returns Promesa que se resuelve cuando el contacto es eliminado.
     */
    async deleteContact(id: string): Promise<void> {
        const docRef = this._getDocRef(id);
        await deleteDoc(docRef);
    }

    /**
     * Obtiene la referencia de un documento de contacto en Firestore.
     * 
     * @param {string} id El ID del contacto.
     * @returns Referencia al documento del contacto en Firestore.
     * @throws {Error} Si el usuario no está autenticado.
     */
    private _getDocRef(id: string) {
        const user = this._auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        return doc(this._firestore, `users/${user.uid}/contacts`, id);
    }
}
