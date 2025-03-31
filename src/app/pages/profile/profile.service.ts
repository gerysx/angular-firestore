import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, Timestamp, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/data-access/auth.service';  // Usamos el AuthService para obtener el uid
import { Profile } from './profile.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly _firestore = inject(Firestore);
  private authService = inject(AuthService);

  // Método para obtener el documento del perfil de Firestore
  async getProfile(): Promise<Profile | null> {
    const uid = this.authService.getUserUid();  // Obtener el UID del usuario logueado
    if (!uid) return null;  // Si no hay usuario logueado, retornar null

    const docRef = doc(this._firestore, `users/${uid}/profile/profile`);  
    const docSnap = await getDoc(docRef);  // Obtener el documento de Firestore

    if (docSnap.exists()) {
      return docSnap.data() as Profile;  // Si el perfil existe, lo retornamos
    } else {
      return null;  // Si no existe el perfil, retornar null
    }
  }

  // Método para crear un perfil si no existe
  async createProfile(profile: Profile): Promise<void> {
    const uid = this.authService.getUserUid();
    if (!uid) return;  // Si no hay usuario logueado, no hacer nada

    // Verificar si ya existe el perfil para este usuario
    const docRef = doc(this._firestore, `users/${uid}/profile`, 'profile');  
    const docSnap = await getDoc(docRef);  // Obtener el documento del perfil

    if (!docSnap.exists()) {
      // Si no existe el perfil, crearlo
      await setDoc(docRef, { 
        ...profile, 
        created: Timestamp.now(),
        updated: Timestamp.now()
      });  // Crear el perfil en la subcolección de ese usuario específico
    } else {
      console.log('El perfil ya existe');
    }
  }

  // Método para actualizar el perfil
  async updateProfile(profile: Profile): Promise<void> {
    const uid = this.authService.getUserUid();
    if (!uid) return;  // Si no hay usuario logueado, no hacer nada

    const docRef = doc(this._firestore, `users/${uid}/profile`, 'profile');  // Referencia al perfil único
    await updateDoc(docRef, { 
      ...profile, 
      updated: Timestamp.now()  // Actualizamos la fecha de actualización
    });
  }
}
