import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, DocumentReference, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { Profile } from './profile.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly _firestore = inject(Firestore);
  private readonly _collection = collection(this._firestore, 'users');

  async newProfile(profile: Profile): Promise<Profile> {
    try {
      const docRef: DocumentReference = await addDoc(collection(this._firestore, 'users'), profile);
      console.log('Perfil creado con ID:', docRef.id);
      
      // Devolver el perfil con el ID generado
      return { ...profile, id: docRef.id }; // Se devuelve el perfil con el ID añadido
    } catch (error) {
      console.error('Error al crear perfil:', error);
      throw error; // Rechaza la promesa si hay un error
    }
  }

  // Obtener referencia a un documento por ID
  private _getDocRef(id: string) {
    return doc(this._firestore, 'users', id);
  }

  // Método para actualizar un perfil por ID
  async updateProfile(id: string, profile: Partial<Profile>): Promise<void> {
    try {
      const docRef = this._getDocRef(id);
      await updateDoc(docRef, { ...profile });
      console.log('Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      throw error;
    }
  }

  async getProfileById(id: string): Promise<Profile | null> {
    const docRef = this._getDocRef(id);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? (docSnapshot.data() as Profile) : null;
  }
}
