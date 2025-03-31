import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, Timestamp, collection, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Profile } from './profile.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly _firestore = inject(Firestore);
  private readonly _auth = inject(Auth);

  // Obtener la subcolección 'profile' del usuario logueado
  private _getUserProfileCollection() {
    const user = this._auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    return collection(this._firestore, `users/${user.uid}/profile`);
  }

  // Método para obtener el perfil
  async getProfile(): Promise<Profile | null> {
    const uid = this._auth.currentUser?.uid;
    if (!uid) return null;  // Si no hay usuario logueado, retornar null

    // Referencia a la subcolección 'profile' con el UID como ID del documento
    const docRef = doc(this._firestore, `users/${uid}/profile`, uid);  // Usamos UID como ID del documento
    const docSnap = await getDoc(docRef);  // Obtener el documento del perfil

    if (docSnap.exists()) {
      return docSnap.data() as Profile;  // Si el perfil existe, lo retornamos
    } else {
      return null;  // Si no existe el perfil, retornar null
    }
  }

  // Método para crear un perfil si no existe
  async createProfile(profile: Profile): Promise<void> {
    const uid = this._auth.currentUser?.uid;
    if (!uid) return;  // Si no hay usuario logueado, no hacer nada

    const docRef = doc(this._firestore, `users/${uid}/profile`, uid);  // Usamos el UID como ID del documento

    // Verificamos si ya existe un perfil para este usuario
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('El perfil ya existe, no se puede crear otro');
      return;  // Si ya existe, no hacemos nada
    }

    // Si no existe el perfil, lo creamos
    await setDoc(docRef, {
      ...profile,
      created: Timestamp.now(),
      updated: Timestamp.now(),
    });
  }

  // Método para actualizar el perfil
  async updateProfile(profile: Profile): Promise<void> {
    const uid = this._auth.currentUser?.uid;
    if (!uid) return;  // Si no hay usuario logueado, no hacer nada

    // Referencia al documento del perfil en la subcolección 'profile' con el UID como ID
    const docRef = doc(this._firestore, `users/${uid}/profile`, uid);  // Usamos UID como ID del documento

    // Actualizamos el documento
    await updateDoc(docRef, {
      ...profile,
      updated: Timestamp.now(),  // Actualizamos la fecha de actualización
    });
  }
}
