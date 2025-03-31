import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc, query, orderBy } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Contact } from "./contact.interface";
import { Auth } from "@angular/fire/auth";

@Injectable({ providedIn: 'root' })
export class ContactService {
    private readonly _firestore = inject(Firestore);
    private readonly _auth = inject(Auth);

    private _getUserContactsCollection() {
        const user = this._auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        return collection(this._firestore, `users/${user.uid}/contacts`);
    }

    async newContact(contact: Partial<Contact>) {
        const contactCollection = this._getUserContactsCollection();
        return await addDoc(contactCollection, {
            created: Date.now(),
            updated: Date.now(),
            ...contact,
        });
    }

    getAllContacts(): Observable<Contact[]> {
        const contactCollection = this._getUserContactsCollection();
        const queryFn = query(contactCollection, orderBy("created", "desc"));
        return collectionData(queryFn, { idField: "id" }) as Observable<Contact[]>;
    }

    async getContactById(id: string): Promise<Contact> {
        const docRef = this._getDocRef(id);
        const documentData = await getDoc(docRef);
        return documentData.data() as Contact;
    }

    async updateContact(id: string, contact: Contact): Promise<void> {
        const docRef = this._getDocRef(id);
        await updateDoc(docRef, { ...contact, updated: Date.now() });
    }

    async deleteContact(id: string): Promise<void> {
        const docRef = this._getDocRef(id);
        await deleteDoc(docRef);
    }

    private _getDocRef(id: string) {
        const user = this._auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        return doc(this._firestore, `users/${user.uid}/contacts`, id);
    }
}
